# CDISC Dataset-JSON repository

This repository contains the schema, specification, and examples of the Dataset-JSON standard for Clinical Datasets.

The Dataset-JSON v1.1 release can be downloaded as a [zip](https://github.com/cdisc-org/DataExchange-DatasetJson/releases/tag/v1.1) file.

## Dataset-JSON Specification

The [doc](https://github.com/cdisc-org/DataExchange-DatasetJson/tree/publish_v11/doc) folder contains the specifications of:

- [Dataset-JSON v1.1](doc/dataset-json1-1.html).
- The [NDJSON](doc/dataset-json-ndjson1-1.html) representation of Dataset-JSON v1.1

## Dataset-JSON Schema

The [schema](https://github.com/cdisc-org/DataExchange-DatasetJson/tree/publish_v11/schema) folder contains the LinkML and JSON schemas for the JSON and NDJSON specification of Dataset-JSON.

## Example Data

The [examples](examples/README.md) folder contains the following examples:

- The **examples/adam** folder contains Dataset-JSON JSON and NDJSON examples of ADaM data
- The **examples/sdtm** folder contains Dataset-JSON JSON and NDJSON examples of SDTM data
- The **examples/send** folder contains Dataset-JSON JSON and NDJSON examples of SEND data

- The **examples/big_xpt** folder contains scripts to create a large XPT file (5Gb) from the XPT file **examples/sdtm/lb.xpt**.
- The **examples/extensions** folder contains an example of extending the Dataset-JSON schema: **examples/extensions/extension.yaml**.
- The **examples/i18n** folder contains an example of a Dataset-JSON file with non-ASCII characters: **examples/i18n/ae.json**.
