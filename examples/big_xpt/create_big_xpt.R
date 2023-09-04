# Loading packages
library(dplyr)
library(xportr)
library(rlang)
library(readxl)
library(foreach)
library(stringr)
library(data.table)

lb0 <- haven::read_xpt('../sdtm/lb.xpt')

# The original lb.xpt file is 2.63 Mb. The factor 6800 expands it to 5Gb
# xportr will shorten some lengths.
data_tables <- foreach(i = 1:6760) %do% {
  data.table(lb0 %>%
               mutate(USUBJID=str_c(USUBJID,sprintf("%04d", i),sep="")))
}

lb <- rbindlist(data_tables)

var_spec <- read_xlsx(
  "SDTM_metadata_spec.xlsx",
  sheet = "Variables"
) %>%
  rename(type = "Data Type") %>%
  set_names(tolower)

lb_type <- xportr_type(lb, var_spec, domain = "LB", verbose = "message")
lb_length <- lb %>% xportr_length(var_spec, domain = "LB", "message")
lb_order <- xportr_order(lb, var_spec, domain = "LB", verbose = "message")
lb_fmt <- lb %>% xportr_format(var_spec, domain = "LB")
lb_lbl <- lb %>% xportr_label(var_spec, domain = "LB", "message")

lb %>%
  xportr_type(var_spec, "LB", "message") %>%
  xportr_length(var_spec, "LB", "message") %>%
  xportr_label(var_spec, "LB", "message") %>%
  xportr_order(var_spec, "LB", "message") %>%
  xportr_format(var_spec, "LB") %>%
  xportr_write("lb.xpt", label = "Laboratory Test Results")
