%* update this location to your own local GitHub location;
%let root=/_github/cdisc-org/DataExchange-DatasetJson;



%macro expand(
  xptin=,           /* Path to the XPT file used as input */
  xptout=,          /* Path to the XPT file to be created */
  libout=,          /* Library where SAS dataset will be created */
  dataset=,         /* Name of the SAS dataset */
  idvar=USUBJID,    /* Character Variable that will be updated by adding the iteration in z4.*/
  factor=           /* Factor with wich the XPT size will be multiplied */
  );

  /* This macro will expand an XPT file by multiplying it's content */

  %local _random_ _variables_ dsid _varlen _varnum _rc _dataset_label;
  
  %let _random_=%sysfunc(putn(%sysevalf(%sysfunc(ranuni(0))*10000,floor),z4.));

  libname xpti&_random_ xport "&xptin";
  libname xpto&_random_ xport "&xptout";

  %local _SaveOptions dataset_label;

  %let _SaveOptions = %sysfunc(getoption(compress, keyword)) %sysfunc(getoption(reuse, keyword));
  options compress=Yes reuse=Yes;

  proc copy in=xpti&_random_ out=&libout;
    select &dataset;
  run;

  %let dsid=%sysfunc(open(&libout..&dataset,is));
  %if &dsid ne 0 %then %do;
    %let _varnum=%sysfunc(varnum(&dsid,&idvar));
    %let _varlen = %sysfunc(varlen(&dsid,&_varnum));
    %let _dataset_label = %sysfunc(attrc(&dsid,label));

    %put &=_varlen &=dataset_label;
  %end;  
  %let _rc=%sysfunc(close(&dsid));
  
  proc sql noprint;
    select name into :_variables_ separated by ' '
    from dictionary.columns
    where libname=upcase("&libout") and memtype="DATA" and memname="%upcase(&dataset)"
    ;
  quit;

  data work.&dataset._in_&_random_;
    retain &_variables_;
    length &idvar $ %eval(&_varlen + 4);
    set &libout..&dataset;
  run;

  data &libout..&dataset;
    retain &_variables_;
    length &idvar $ %eval(&_varlen + 4);
    set &dataset._in_&_random_;
    if 0=1;
  run;

  options nonotes;
  %do i=1 %to &factor;

    data &dataset._add_&_random_ (drop=__i);
      length &idvar $ %eval(&_varlen + 4);
      retain &_variables_;
      set &dataset._in_&_random_;
          __i = put(&i, z4.);
        %if &i gt 1 %then %do;
          &idvar=cats(&idvar, __i);
        %end;
    run;

    proc append base=&libout..&dataset data=&dataset._add_&_random_;
    run;

  %end;
  options notes;

  %if %sysevalf(%superq(dataset_label)=, boolean)=0 %then %do;
    proc datasets library=&libout nolist;
       modify &dataset(label="&_dataset_label");
    quit;
  %end;

  proc copy in=&libout out=xpto&_random_;
    select &dataset;
  run;

  proc delete data=work.&dataset._in_&_random_ work.&dataset._add_&_random_;
  run;

  %* Restore options;
  options &_SaveOptions;
  
  libname xpti&_random_ clear;
  libname xpto&_random_ clear;

%mend expand;

/* The original lb.xpt file is 2.63 Mb. TThe factor 1936 expands it to 5Gb */
%expand(
  xptin=&root/examples/sdtm/lb.xpt, 
  xptout=&Root/examples/big_xpt/lb.xpt, 
  dataset=lb,  
  libout=work,
  idvar=USUBJID,
  factor=1939
  );
