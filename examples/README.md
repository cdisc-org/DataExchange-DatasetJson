# Examples

The examples conform to the Dataset-JSON 1.1 specification.

- The examples in the sdtm folder were created from XPT files that were published as part of the [Study Data Tabulation Model Metadata Submission Guidelines (SDTM-MSG): Human Clinical Trials Version 2.0 (Final, 30 March 2021)](https://www.cdisc.org/standards/foundational/sdtm/sdtm-metadata-submission-guidelines-v2-0).
- The examples in the adam folder were created from XPT files that were published as part of the [Analysis Data Model Metadata Submission Guidelines (ADaM MSG): Human Clinical Trials Version 1.0 (Final, 18 April 2023)](https://www.cdisc.org/standards/foundational/adam/adam-metadata-submission-guidelines-v1-0).
- The examples in the send folder were created from XPT files that were part of the CBER Pilot.

For illustration purposes several variables in the ADLBC and ADLBH datasets in the ADaM example that had a DataType='float' in Define-XML had their data type converted to 'decimal' in the JSON examples.

The [big_xpt](https://github.com/cdisc-org/DataExchange-DatasetJson/tree/publish_v11/examples/big_xpt) folder contains scripts to create a large XPT file (5Gb) from the XPT file.

The [extensions](https://github.com/cdisc-org/DataExchange-DatasetJson/tree/publish_v11/examples/extensions) folder contains an example of extending the Dataset-JSON schema.

The [i18n](https://github.com/cdisc-org/DataExchange-DatasetJson/tree/publish_v11/examples/i18n) folder contains a JSON file (ae.json) with with Japanese non-ASCII characters in the AETERM variable.

The example JSON files, XPT files, and Define-XML documents are for illustration purposes only and may not conform to regulatory health authorities' requirements or guidance.
