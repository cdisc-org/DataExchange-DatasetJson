# CDISC Dataset-JSON v1.1 Specification

<table title="Version information">
  <colgroup>
    <col class="first">
    <col>
  </colgroup>
  <tbody>
    <tr>
      <th>Title</th>
      <td>CDISC Dataset-JSON Specification</td>
    </tr>
    <tr>
      <th>Version</th>
      <td>1.1</td>
    </tr>
    <tr>
      <th>Prepared by</th>
      <td>CDISC Data Exchange Standards Team</td>
    </tr>
    <tr>
      <th>Notes to Readers</th>
      <td>This is the specification for Version 1.1 of CDISC Dataset-JSON.</td>
    </tr>
    <tr>
      <th colspan="1">Revision History</th>
      <td colspan="1">
        <table title="Revision  hidstory">
          <tbody>
            <tr>
              <th>Date</th>
              <th>Version</th>
              <th>Summary of Changes</th>
            </tr>
            <tr>
              <td>2024-12-05</td>
              <td>1.1</td>
              <td>Final</td>
            </tr>
            <tr>
              <td>2023-08-23</td>
              <td>1.0</td>
              <td>Final</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

- [Introduction](#introduction)
- [Top-level Metadata Attributes](#toplevelmetadataattributes)
- [Column Metadata](#columnmetadata)
  - [Supported Column Data Type Combinations](#supportedcolumndatatypecombinations)
  - [Date/Time Variables](#datetimevariables)
  - [Decimal Variables](#decimalvariables)
- [Row Data](#rowdata)
- [A Full Example of a Dataset-JSON File](#afullexampleofadatasetjsonfile)
- [NDJSON Representation of Dataset-JSON](#ndjsonrepresentationofdatasetjson)
- [A Full Example of an NDJSON Dataset-JSON File](#afullexampleofanndjsondatasetjsonfile)
- [Glossary and Abbreviations](#glossaryandabbreviations)

## <a id="introduction"></a>Introduction

Dataset-JSON is a data exchange standard for sharing tabular data using JSON. It is designed to meet a wide range of data exchange scenarios, including regulatory submissions and API-based data exchange. Each Dataset-JSON dataset can optionally reference a Define-XML document containing more complete metadata for the dataset. One aim of Dataset-JSON is to address as many of the relevant requirements in the PHUSE 2017 [Transport for the Next Generation](https://www.cdisc.org/sites/default/files/2023-05/Transport-for-the-Next-Generation-Version-1.0.pdf) paper as possible, including the efficient use of storage space.

Dataset-JSON uses lowerCamelCase notation for attribute names.

The JSON standard does not allow specifying or controlling the order of attributes. However, since most JSON encoders and decoders allow control over attribute order, it is strongly recommended to follow the attribute order documented in this specification. Due to the potentially large size of Dataset-JSON datasets, adhering to the specified attribute order allows software using streaming approaches to read the file more efficiently and quickly.

Dataset-JSON must contain only 1 dataset per file. Dataset-JON uses the file extension .json.

Although adapted from the [Dataset-XML Version 1.0 specification](https://www.cdisc.org/standards/foundational/dataset-xml/dataset-xml-v10), Dataset-JSON uses the JSON format and includes many enhancements.

The LinkML model representation, the JSON schema, both for JSON and NDJSON representations, and examples can be found at the [GitHub repository](https://github.com/cdisc-org/DataExchange-DatasetJson) for the Dataset-JSON Version 1.1 standard.

The specification and user's guide are for both clinical and non-clinical research data.

## <a id="toplevelmetadataattributes"></a>Top-level Metadata Attributes

 The following table summarizes the technical and dataset attributes at the top level of the Dataset-JSON object.

<table title="Top-level Metadata Attributes">
  <tbody>
    <tr>
      <th>Attribute order</th>
      <th>Attribute</th>
      <th>JSON Schema data type</th>
      <th>Enumeration</th>
      <th>Allowed string pattern</th>
      <th>Usage</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>1</td>
      <td>datasetJSONCreationDateTime</td>
      <td>string</td>
      <td></td>
      <td>YYYY-MM-DD<strong>T</strong>hh:mm:ss(.n+)?(((+|-)hh:mm)|Z)?</td>
      <td>Required</td>
      <td>The date/time the Dataset-JSON file was created.</td>
    </tr>
    <tr>
      <td>2</td>
      <td>datasetJSONVersion</td>
      <td>string</td>
      <td></td>
      <td>1.1(.(0|([1-9][0-9]*)))?</td>
      <td>Required</td>
      <td>The version of the Dataset-JSON standard used to create the dataset.</td>
    </tr>
    <tr>
      <td>3</td>
      <td>fileOID</td>
      <td>string</td>
      <td></td>
      <td>"minLength": 1</td>
      <td>Optional</td>
      <td>A unique identifier for this dataset. See the <a href="https://wiki.cdisc.org/display/PUB/Element+Identifiers+and+References">
          ODM specification</a> for OID considerations.
      </td>
    </tr>
    <tr>
      <td>4</td>
      <td>dbLastModifiedDateTime</td>
      <td>string</td>
      <td></td>
      <td>YYYY-MM-DD<strong>T</strong>hh:mm:ss(.n+)?(((+|-)hh:mm)|Z)?</td>
      <td>Optional</td>
      <td>The date/time the source database was last modified before creating the
          Dataset-JSON file. dbLastModifiedDateTime must be on or before the
          date/time the Dataset-JSON file was created (datasetJSONCreationDateTime).
      </td>
    </tr>
    <tr>
      <td>5</td>
      <td>originator</td>
      <td>string</td>
      <td></td>
      <td></td>
      <td>Optional</td>
      <td>The organization that generated the Dataset-JSON dataset.</td>
    </tr>
    <tr>
      <td>6</td>
      <td>sourceSystem</td>
      <td>object</td>
      <td></td>
      <td></td>
      <td>Optional</td>
      <td>The information system from which the content of this dataset was sourced.</td>
    </tr>
    <tr>
      <td>7</td>
      <td>sourceSystem.name</td>
      <td>string</td>
      <td></td>
      <td></td>
      <td>Required</td>
      <td>The name of the sourceSystem above. The sourceSystem itself
          is an optional attribute. However, when the sourceSystem is
          present, the name is a required attribute of the sourceSystem.
      </td>
    </tr>
    <tr>
      <td>8</td>
      <td>sourceSystem.version</td>
      <td>string</td>
      <td></td>
      <td></td>
      <td>Required</td>
      <td>The version of the sourceSystem above. The sourceSystem itself is an optional
          attribute. However, when the sourceSystem is present, the version is a
          required attribute of the sourceSystem.
      </td>
    </tr>
    <tr>
      <td>9</td>
      <td>studyOID</td>
      <td>string</td>
      <td></td>
      <td>"minLength": 1</td>
      <td>Optional</td>
      <td>Unique identifier for the
          study that may also function as a foreign key to a Study/@OID in an
          associated Define-XML document, or to any studyOID references that are used as
          keys in other documents; i.e., documents created based on the ICH
          eCTD STF Specification. See the
          <a href="https://wiki.cdisc.org/display/PUB/Element+Identifiers+and+References">ODM specification</a> for
          OID considerations.
      </td>
    </tr>
    <tr>
      <td>10</td>
      <td>metaDataVersionOID</td>
      <td>string</td>
      <td></td>
      <td>"minLength": 1</td>
      <td>Optional</td>
      <td>Unique identifier for the
          metadata version that may also function as a foreign key to a
          MetaDataVersion/@OID in an associated Define-XML file. See the <a href=
          "https://wiki.cdisc.org/display/PUB/Element+Identifiers+and+References">ODM specification</a>
          for OID considerations.
      </td>
    </tr>
    <tr>
      <td>11</td>
      <td>metaDataRef</td>
      <td>string</td>
      <td></td>
      <td></td>
      <td>Optional</td>
      <td>URI for the metadata file describing the dataset (e.g., a Define-XML file).
      </td>
    </tr>
    <tr>
      <td>12</td>
      <td>itemGroupOID</td>
      <td>string</td>
      <td></td>
      <td>"minLength": 1</td>
      <td>Required</td>
      <td>Unique identifier for the
          dataset that may also function as a foreign key to an
          ItemGroupDef/@OID in an associated Define-XML file. See the <a href="https://wiki.cdisc.org/display/PUB/Element+Identifiers+and+References">
          ODM specification</a> for OID considerations.
      </td>
    </tr>
    <tr>
      <td>13</td>
      <td>records</td>
      <td>integer</td>
      <td></td>
      <td>"minimum": 0</td>
      <td>Required</td>
      <td>The total number of records in
          a dataset. Since "rows" is an optional object, records=0 allows for the
          transfer of metadata without sending data.
      </td>
    </tr>
    <tr>
      <td>14</td>
      <td>name</td>
      <td>string</td>
      <td></td>
      <td>"minLength": 1</td>
      <td>Required</td>
      <td>The human-readable name for the dataset.</td>
    </tr>
    <tr>
      <td>15</td>
      <td>label</td>
      <td>string</td>
      <td></td>
      <td></td>
      <td>Required</td>
      <td>A short description of the
      dataset.</td>
    </tr>
    <tr>
      <td>16</td>
      <td>columns</td>
      <td>array</td>
      <td></td>
      <td></td>
      <td>Required</td>
      <td>An array of metadata objects that describe the dataset variables.</td>
    </tr>
    <tr>
      <td>17</td>
      <td>rows</td>
      <td>array</td>
      <td></td>
      <td></td>
      <td>Optional</td>
      <td>An array of data record arrays that represent the dataset rows.</td>
    </tr>
  </tbody>
</table>

  The following example illustrates the basic Dataset-JSON structure.

```json
  {
      "datasetJSONCreationDateTime": "2023-03-22T11:53:27",
      "datasetJSONVersion": "1.1.0",
      "fileOID": "www.sponsor.xyz.org.project123.final",
      "dbLastModifiedDateTime": "2023-02-15T10:23:15",
      "originator": "Sponsor XYZ",
      "sourceSystem": {
          "name": "Software ABC",
          "version": "1.0.0"
      },
      "studyOID": "xxx",
      "metaDataVersionOID": "xxx.y",
      "metaDataRef": "https://metadata.location.org/api.link",
      "itemGroupOID": "IG.DM",
      "records": 100,
      "name": "DM",
      "label": "Demographics",
      "columns": [ ... ],
      "rows": [ ... ]
  }
```  

## <a id="columnmetadata"></a>Column Metadata

**columns** is an array of basic information about dataset variables. The order of the elements in the array must be the same as the order of variables in the described dataset.

<table title="Column metadata">
  <tbody>
    <tr>
      <th>Attribute order</th>
      <th>Attribute</th>
      <th>JSON Schema data type</th>
      <th>Enumeration</th>
      <th>Allowed string pattern</th>
      <th>Usage</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>1</td>
      <td>itemOID</td>
      <td>string</td>
      <td></td>
      <td>"minLength": 1</td>
      <td>Required</td>
      <td>Unique identifier for the
        variable that may also function as a foreign key to an
        ItemDef/@OID in an associated Define-XML file. See the <a href=
        "https://wiki.cdisc.org/display/PUB/Element+Identifiers+and+References">ODM specification</a> for OID considerations.
      </td>
    </tr>
    <tr>
      <td>2</td>
      <td>name</td>
      <td>string</td>
      <td></td>
      <td>"minLength": 1</td>
      <td>Required</td>
      <td>Variable name</td>
    </tr>
    <tr>
      <td>3</td>
      <td>label</td>
      <td>string</td>
      <td></td>
      <td></td>
      <td>Required</td>
      <td>Variable description</td>
    </tr>
    <tr>
      <td>4</td>
      <td>dataType</td>
      <td>string</td>
      <td>["string", "integer", "decimal", "float", "double",
          "boolean", "datetime", "date", "time", "URI"]
      </td>
      <td></td>
      <td>Required</td>
      <td>Logical data type of the variable. The dataType attribute represents
          the planned specificity of the data.
          <p>See the <a href=
          "https://wiki.cdisc.org/display/PUB/Data+Formats">ODM Data Formats</a> specification
          for details.</p>
          <p><strong>Note:</strong> Decimal numbers represented as a string
          in JSON must use the dot (.) as the decimal separator. When a
          thousand separator is used in a decimal represented as string, the
          comma is used.</p>
          <p><strong>Note:</strong> The boolean data type in JSON only
          supports true and false. Currently, CDISC standards like ADaM,
          SDTM, and SEND do not support the boolean data type. These
          standards instead use flags like "Y" and "N".</p>
      </td>
    </tr>
    <tr>
      <td>5</td>
      <td>targetDataType</td>
      <td>string</td>
      <td>["integer", "decimal"]</td>
      <td></td>
      <td>Optional</td>
      <td>Indicates the data type into which the receiving system
          must transform the associated Dataset-JSON variable. The variable
          with the data type attribute of dataType must be converted into the
          targetDataType when transforming the Dataset-JSON dataset into a
          format for operational use (e.g., SAS dataset, R dataframe, loading
          into a system's data store). Only specify targetDataType when it is
          different from the dataType attribute or the JSON data type and
          the data needs to be transformed by the receiving system.
          See the Supported Column Data Type Combinations table for details
          on usage. See the <a href="https://wiki.cdisc.org/display/PUB/User%27s+Guide">User's Guide</a> for additional
          information.
      </td>
    </tr>
    <tr>
      <td>6</td>
      <td>length</td>
      <td>integer</td>
      <td></td>
      <td>"minimum":1</td>
      <td>Optional</td>
      <td>Specifies the number of characters allowed for the variable value when it is represented as a text.
          See the definition and notes of the
          ItemDef Length attribute in the <a href="https://wiki.cdisc.org/display/PUB/ItemDef">ODM specification</a>
          for more details. Just like
          in the Define-XML specification, the variable lengths are planned lengths.
      </td>
    </tr>
    <tr>
      <td>7</td>
      <td>displayFormat</td>
      <td>string</td>
      <td></td>
      <td></td>
      <td>Optional</td>
      <td>A SAS display format value used for data visualization of numeric float and date values.</td>
    </tr>
    <tr>
      <td>8</td>
      <td>keySequence</td>
      <td>integer</td>
      <td></td>
      <td>"minimum":1</td>
      <td>Optional</td>
      <td>Indicates that this item is a key variable in the dataset structure.
          It also provides an ordering for the keys.
      </td>
    </tr>
  </tbody>
</table>

  The following example shows the columns metadata structure.

```json
"columns": [
    {
        "itemOID": "IT.DM.STUDYID",
        "name": "STUDYID",
        "label": "Study Identifier",
        "dataType": "string",
        "length": 12,
        "keySequence": 1,
    },
    {
        "itemOID": "IT.DM.DOMAIN",
        "name": "DOMAIN",
        "label": "Domain Abbreviation",
        "dataType": "string",
        "length": 2
    },
    ...
]
```

### <a id="supportedcolumndatatypecombinations"></a>Supported Column Data Type Combinations

The JSON data type mentioned in the "Supported Column Data Type Combinations" table is the data type of the actual data in the "rows" arrays in the Dataset-JSON file. This JSON data type is defined by the Dataset-JSON Schema, but only includes "string", "integer", "boolean", number", and null. It does not include "array" or "object".

<table title="Supported Column Data Type Combinations">
  <tbody>
    <tr>
      <th>dataType (logical)</th>
      <th>JSON data type</th>
      <th>targetDataType</th>
      <th>Comment</th>
    </tr>
    <tr>
      <td>string</td>
      <td>string</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>integer</td>
      <td>integer</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>decimal</td>
      <td>string</td>
      <td>decimal</td>
      <td>decimal is exchanged as a string and uses "." as the decimal separator</td>
    </tr>
    <tr>
      <td>float</td>
      <td>number</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>double</td>
      <td>number</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>boolean</td>
      <td>boolean</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>datetime</td>
      <td>string</td>
      <td></td>
      <td>ISO 8601 datetime as a string</td>
    </tr>
    <tr>
      <td>date</td>
      <td>string</td>
      <td></td>
      <td>ISO 8601 date as a string</td>
    </tr>
    <tr>
      <td>time</td>
      <td>string</td>
      <td></td>
      <td>ISO 8601 time as a string</td>
    </tr>
    <tr>
      <td>datetime</td>
      <td>string</td>
      <td>integer</td>
      <td>ISO 8601 datetime as an integer (use case: ADaM)</td>
    </tr>
    <tr>
      <td>date</td>
      <td>string</td>
      <td>integer</td>
      <td>ISO 8601 date as an integer (use case: ADaM)</td>
    </tr>
    <tr>
      <td>time</td>
      <td>string</td>
      <td>integer</td>
      <td>ISO 8601 time as an integer (use case: ADaM)</td>
    </tr>
    <tr>
      <td>URI</td>
      <td>string</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

### <a id="datetimevariables"></a>Date/Time Variables

Timing variables (datetime, date, time) are stored as ISO 8601 strings in the JSON format. The targetDataType attribute needs to be specified when different from dataType attribute or the JSON data type.

For example, consider the following AE dataset. The AESTDTC and AEENDTC variables have "date" as their logical data type (dataType attribute), and since the values are already ISO 8601 strings in the data, no conversion is needed to a string in JSON format. The targetDataType for the date and datetime variables does not need to be mentioned for SDTM datasets as the logical type is the same as the JSON data type.

```json
"columns": [
    {"itemOID": "IT.AE.STUDYID", "name": "STUDYID", "label": "Study Identifier", "dataType": "string", "length": 12},
    {"itemOID": "IT.AE.DOMAIN", "name": "DOMAIN", "label": "Domain Abbreviation", "dataType": "string", "length": 2},
    {"itemOID": "IT.AE.USUBJID", "name": "USUBJID", "label": "Unique Subject Identifier", "dataType": "string", "length": 8, "keySequence": 1},
    ...
    {"itemOID": "IT.AE.AESTDTC", "name": "AESTDTC", "label": "Start Date/Time of Adverse Event", "dataType": "date", "keySequence": 4},
    {"itemOID": "IT.AE.AEENDTC", "name": "AEENDTC", "label": "End Date/Time of Adverse Event", "dataType": "date"},
    ...
]
"rows": [
    ["CDISCPILOT01", "AE", "CDISC001", ..., "2012-12-02", "2013-05-20", ...]
]
```

For ADaM datasets, the targetDataType must be set to integer. Consider the following example of ADAE data. The targetDataType attribute is mentioned, as the logical data type is different from the JSON data type. Also note that the displayFormat attribute has been specified as "E8601DA" so that SAS can display these numeric values in a user-friendly way.

```json
"columns": [
    {"itemOID": "IT.ADAE.STUDYID", "name": "STUDYID", "label": "Study Identifier", "dataType": "string", "length": 12},
    {"itemOID": "IT.ADAE.SITEID", "name": "SITEID", "label": "Study Site Identifier", "dataType": "string", "length": 3},
    {"itemOID": "IT.ADAE.USUBJID", "name": "USUBJID", "label": "Unique Subject Identifier", "dataType": "string", "length": 11, "keySequence": 1},
    ...
    {"itemOID": "IT.ADAE.TRTSDT", "name": "TRTSDT", "label": "Date of First Exposure to Treatment", "dataType": "date", "targetDataType": "integer", "displayFormat": "E8601DA."},
    {"itemOID": "IT.ADAE.TRTEDT", "name": "TRTEDT", "label": "Date of Last Exposure to Treatment", "dataType": "date", "targetDataType": "integer", "displayFormat": "E8601DA."},
    {"itemOID": "IT.ADAE.ASTDT", "name": "ASTDT", "label": "Analysis Start Date", "dataType": "date", "targetDataType": "integer", "displayFormat": "E8601DA.", "keySequence": 3},
    ...
]
"rows": [
    ["CDISCPILOT01", 701", "CDISC001", ..., "2014-01-02", "2014-07-02", "2014-01-03", ...]
    ...
]
```

### <a id="decimalvariables"></a>Decimal Variables

Some decimal variables can be exchanged as a string in JSON to represent terminating decimal fractions without rounding. Hence, the targetDataType is "decimal" and JSON data type is "string".

For example:

```json
"columns": [ ...
    {"itemOID": "IT.ADSL.BMIBL", "name": "BMIBL", "label": "Baseline BMI (kg/m^2)", "dataType": "decimal", "targetDataType": "decimal", "length": 16},
    {"itemOID": "IT.ADSL.HEIGHTBL", "name": "HEIGHTBL", "label": "Baseline Height (cm)", "dataType": "decimal", "targetDataType": "decimal", "length": 5},
    ...
]
"rows": [
    [ ..., "30.8983333232059", "162.9",  ... ],
    [ ..., "28.977529926378", "171.1", ... ],
    ...
]
```

## <a id="rowdata"></a>Row Data

**rows**</strong>** is an array of records with variables values. Each record itself is also represented as an array of variables values.

```json
"columns": [
    {"itemOID": "IT.DM.STUDYID", "name": "STUDYID", "label": "Study Identifier", "dataType": "string", "length": 12, "keySequence": 1},
    {"itemOID": "IT.DM.DOMAIN", "name": "DOMAIN", "label": "Domain Abbreviation", "dataType": "string", "length": 2},
    {"itemOID": "IT.DM.USUBJID", "name": "USUBJID", "label": "Unique Subject Identifier", "dataType": "string", "length": 8, "keySequence": 2},
    ...
    {"itemOID": "IT.DM.AGE", "name": "AGE", "label": "Age", "dataType": "integer"},
    {"itemOID": "IT.DM.AGEU", "name": "AGEU", "label": "Age Units", "dataType": "string", "length": 5},
    ...
   ],
"rows": [
    ["MyStudy", "DM", "CDISC001", ..., 56, "YEARS", ...],
    ["MyStudy", "DM", "CDISC002", ..., 26, "YEARS", ...],
    ...
]
```

Missing values are represented by null. Empty strings are represented by "".

Example:

```json
"columns": [
    {"itemOID": "IT.DM.STUDYID", "name": "STUDYID", "label": "Study Identifier", "dataType": "string", "length": 12, "keySequence": 1},
    {"itemOID": "IT.DM.DOMAIN", "name": "DOMAIN", "label": "Domain Abbreviation", "dataType": "string", "length": 2},
    {"itemOID": "IT.DM.USUBJID", "name": "USUBJID", "label": "Unique Subject Identifier", "dataType": "string", "length": 8, "keySequence": 2},
    ...
    {"itemOID": "IT.DM.AGE", "name": "AGE", "label": "Age", "dataType": "integer"},
    {"itemOID": "IT.DM.AGEU", "name": "AGEU", "label": "Age Units", "dataType": "string", "length": 5},
    ...
   ],
"rows": [
    ["MyStudy", "DM", "CDISC001", ..., null, null, ...],
    ["MyStudy", "DM", "CDISC002", ..., null, "", ...],
    ...
]
```

## <a id="afullexampleofadatasetjsonfile"></a>A Full Example of a Dataset-JSON File

```json
{
  "datasetJSONCreationDateTime": "2023-06-28T15:38:43",
  "datasetJSONVersion": "1.1.0",
  "fileOID": "www.sponsor.xyz.org.project123.final",
  "dbLastModifiedDateTime": "2023-05-31T00:00:00",
  "originator": "Sponsor XYZ",
  "sourceSystem": {
      "name": "Software ABC",
      "version": "1.0.0"
  },
  "studyOID": "cdisc.com.CDISCPILOT01",
  "metaDataVersionOID": "MDV.MSGv2.0.SDTMIG.3.3.SDTM.1.7",
  "metaDataRef": "https://metadata.location.org/CDISCPILOT01/define.xml",
  "itemGroupOID": "IG.DM",
  "records": 18,
  "name": "DM",
  "label": "Demographics",
  "columns": [
      {"itemOID": "IT.DM.STUDYID", "name": "STUDYID", "label": "Study Identifier", "dataType": "string", "length": 12, "keySequence": 1},
      {"itemOID": "IT.DM.DOMAIN", "name": "DOMAIN", "label": "Domain Abbreviation", "dataType": "string", "length": 2},
      {"itemOID": "IT.DM.USUBJID", "name": "USUBJID", "label": "Unique Subject Identifier", "dataType": "string", "length": 8, "keySequence": 2},
      ...
      {"itemOID": "IT.DM.AGE", "name": "AGE", "label": "Age", "dataType": "integer"},
      {"itemOID": "IT.DM.AGEU", "name": "AGEU", "label": "Age Units", "dataType": "string", "length": 5},
      ...
  ],
  "rows": [
      ["CDISCPILOT01", "DM", "CDISC001", ..., 84, "YEARS", ...],
      ["CDISCPILOT01", "DM", "CDISC002", ..., 76, "YEARS", ...],
      ["CDISCPILOT01", "DM", "CDISC003", ..., 61, "YEARS", ...],
      ...
  ]
}
```

## <a id="ndjsonrepresentationofdatasetjson"></a>NDJSON Representation of Dataset-JSON

The purpose of the NDJSON, or new-line delimited JSON, representation of Dataset-JSON is to simplify streaming large datasets. With NDJSON, a dataset can easily be read or written one row at a time without loading the entire dataset into memory. The NDJSON and JSON dataset content are the same. In a data-exchange scenario, the sender and receiver determine whether to use the JSON or the NDJSON representation of Dataset-JSON.

NDJSON is a standard for delimiting JSON in stream protocols. In NDJSON, each line is valid JSON. JSON is delimited by the new-line character (\n or 0x0A), which may be preceded by a carriage return character (\r or 0x0D). UTF-8 encoding is expected. NDJSON uses the file extension .ndjson.

The Dataset-JSON NDJSON format is created from the Dataset-JSON standard by:

* Row 1. Create 1 JSON object that contains the metadata, including the dataset attributes and column definitions.
* Row 2-n. Create 1 JSON array per data row

## <a id="afullexampleofanndjsondatasetjsonfile"></a>A Full Example of an NDJSON Dataset-JSON File

```json
{"datasetJSONCreationDateTime": "2023-06-28T15:38:43", "datasetJSONVersion": "1.1.0", "fileOID": "www.sponsor.xyz.org.project123.final", "dbLastModifiedDateTime": "2023-05-31T00:00:00", "originator": "Sponsor XYZ", "sourceSystem": {"name": "Software ABC", "version": "1.0.0"}, "studyOID": "cdisc.com.CDISCPILOT01", "metaDataVersionOID": "MDV.MSGv2.0.SDTMIG.3.3.SDTM.1.7", "metaDataRef": "https://metadata.location.org/CDISCPILOT01/define.xml", "itemGroupOID": "IG.DM", "records": 18, "name": "DM", "label": "Demographics", "columns": [{"itemOID": "IT.DM.STUDYID", "name": "STUDYID", "label": "Study Identifier", "dataType": "string", "length": 12, "keySequence": 1}, {"itemOID": "IT.DM.DOMAIN", "name": "DOMAIN", "label": "Domain Abbreviation", "dataType": "string", "length": 2},  {"itemOID": "IT.DM.USUBJID", "name": "USUBJID", "label": "Unique Subject Identifier", "dataType": "string", "length": 8, "keySequence": 2}, ..., {"itemOID": "IT.DM.AGE", "name": "AGE", "label": "Age", "dataType": "integer"}, {"itemOID": "IT.DM.AGEU", "name": "AGEU", "label": "Age Units", "dataType": "string", "length": 5}, ...]}
["CDISCPILOT01", "DM", "CDISC001", ..., 84, "YEARS", ...]
["CDISCPILOT01", "DM", "CDISC002", ..., 76, "YEARS", ...]
["CDISCPILOT01", "DM", "CDISC003", ..., 61, "YEARS", ...]
 ...
```

Each row in an NDJSON file can be parsed and processed as stand-alone JSON.

## <a id="glossaryandabbreviations"></a>Glossary and Abbreviations

<table title="Glossary and Abbreviations">
  <tbody>
    <tr>
      <th scope="col">Term</th>
      <th scope="col">Stands for, plus Reference to CDISC Standard or source
      of information</th>
    </tr>
    <tr>
      <td>ADaM</td>
      <td>
        Analysis Dataset Model. CDISC Foundational standard for modeling
        data: <a href=
        "https://www.cdisc.org/standards/foundational/adam">https://www.cdisc.org/standards/foundational/adam</a>
      </td>
    </tr>
    <tr>
      <td>API</td>
      <td>
        Application Programming Interface
      </td>
    </tr>
    <tr>
      <td>Define-XML</td>
      <td>
        CDISC Data Exchange standard for sharing metadata: <a href=
        "https://www.cdisc.org/standards/data-exchange/define-xml">https://www.cdisc.org/standards/data-exchange/define-xml</a>
      </td>
    </tr>
    <tr>
      <td>GitHub</td>
      <td>
        GitHub is a web-based platform that allows developers to store,
        share, and collaborate on code
      </td>
    </tr>
    <tr>
      <td>JSON</td>
      <td>
        JavaScript Object Notation
      </td>
    </tr>
    <tr>
      <td>ICH</td>
      <td>
        International Council for Harmonisation: <a href=
        "https://www.ich.org">https://www.ich.org</a>, <a href=
        "https://www.ich.org/page/study-tagging-file-specification-and-related-files">
        https://www.ich.org/page/study-tagging-file-specification-and-related-files</a>
      </td>
    </tr>
    <tr>
      <td>LinkML</td>
      <td>
        Linked Data Modeling Language: <a href=
        "https://linkml.io/linkml/">https://linkml.io/linkml/</a>
      </td>
    </tr>
    <tr>
      <td>NDJSON</td>
      <td>
        Newline delimited JSON
      </td>
    </tr>
    <tr>
      <td>ODM</td>
      <td>
        Operational Data Model: <a href=
        "https://www.cdisc.org/standards/data-exchange/odm">https://www.cdisc.org/standards/data-exchange/odm</a>
      </td>
    </tr>
    <tr>
      <td>SDTM</td>
      <td>
        Study Data Tabulation Model. CDISC Foundational standard for
        modeling data: <a href=
        "https://www.cdisc.org/standards/foundational/sdtm">https://www.cdisc.org/standards/foundational/sdtm</a>
      </td>
    </tr>
    <tr>
      <td>URI</td>
      <td>
        URI Uniform Resource Identifier
      </td>
    </tr>
    <tr>
      <td>URL</td>
      <td>
        URI Uniform Resource Locator
      </td>
    </tr>
  </tbody>
</table>
