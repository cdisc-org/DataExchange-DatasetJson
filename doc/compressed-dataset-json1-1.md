# CDISC Compressed Dataset-JSON v1.1 Specification (DSJC)

<table title="Version information">
  <colgroup>
    <col class="first">
    <col>
  </colgroup>
  <tbody>
    <tr>
      <th>Title</th>
      <td>CDISC Compressed Dataset-JSON Specification</td>
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
      <td>This is the specification for Version 1.0 of CDISC Compressed Dataset-JSON.</td>
    </tr>
    <tr>
      <th colspan="1">Revision History</th>
      <td colspan="1">
        <table title="Revision  history">
          <tbody>
            <tr>
              <th>Date</th>
              <th>Version</th>
              <th>Summary of Changes</th>
            </tr>
            <tr>
              <td>2025-06-19</td>
              <td>1.1</td>
              <td>Draft</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

- [Introduction](#introduction)
- [Format Definition](#formatdefinition)
- [Base Format: Dataset-NDJSON](#baseformat)
- [Compression](#compression)
- [File Format](#fileformat)
- [File Extension and MIME Type](#fileextensionandmimetype)
- [Processing Overview](#processingoverview)
  - [Creating a DSJC File](#creatingdsjc)
  - [Reading a DSJC File](#readingdsjc)
- [Implementation Considerations](#implementation)
  - [Memory Efficiency](#memoryefficiency)
  - [Compression Level Selection](#compressionlevelselection)
  - [Error Handling](#errorhandling)
  - [Compatibility](#compatibility)
- [Benefits](#benefits)
- [Limitations](#limitations)
- [Conformance](#conformance)
- [Glossary and Abbreviations](#glossaryandabbreviations)

## <a id="introduction"></a>Introduction

The DSJC (Dataset-JSON Compressed) format is a standardized method for compressing Dataset-JSON content. It specifically uses the Dataset-NDJSON format as the base structure and applies zLib compression to create a more compact representation of the data. This specification describes the DSJC format in a language-neutral manner to ensure interoperability across different platforms and programming environments.

## <a id="formatdefinition"></a>Format Definition

DSJC is defined as a direct zLib compression stream of Dataset-NDJSON format content without additional headers, signatures, or metadata beyond what the zLib format itself provides.

## <a id="baseformat"></a>Base Format: Dataset-NDJSON

The Dataset-NDJSON format serves as the base format for DSJC as it provides better streaming capabilities. It consists of:

1. **First line**: A JSON object containing Dataset-JSON metadata (without the rows property)
2. **Subsequent lines**: Each line is a valid JSON array or object representing a single data record

Usage of whitespace characters should be reduced to a minimum required by the Dataset-NDJSON format. Avoid spaces between JSON array elements or attribute definitions.

Example of Dataset-NDJSON before compression:

```json
{"datasetJSONCreationDateTime":"2023-01-01T12:00:00","datasetJSONVersion":"1.1","records":3,"name":"ADSL","label":"Subject Level Analysis Dataset","columns":[...]}
["SUBJ001",45,"M"]
["SUBJ002",52,"F"]
["SUBJ003",38,"M"]
```

## <a id="compression"></a>Compression

DSJC applies standard zLib compression to the entire Dataset-NDJSON content:

1. **Compression algorithm**: zLib (DEFLATE)
2. **Compression level**: Implementers may choose an appropriate compression level, with 9 (maximum compression) recommended for storage-optimized scenarios and lower levels for performance-sensitive applications
3. **Window size**: 15 bits (32 KB window) is recommended
4. **Strategy**: Default compression strategy is recommended

## <a id="fileformat"></a>File Format

A DSJC file consists solely of the zLib-compressed byte stream without any additional headers, signatures, or metadata wrapping. The zLib format itself contains sufficient information for decompressors to reconstruct the original Dataset-NDJSON content.

## <a id="fileextensionandmimetype"></a>File Extension and MIME Type

Files following this specification should use the .dsjc file extension. The recommended MIME type is:

```text
application/vnd.cdisc.dataset-json.compressed
```

## <a id="processingoverview"></a>Processing Overview

### <a id="creatingdsjc"></a>Creating a DSJC File

The process to create a DSJC file consists of:

1. Construct a Dataset-NDJSON format representation of the data:
   - First line contains dataset metadata as a JSON object
   - Each subsequent line contains a single record as a JSON array or object
2. Apply zLib compression to the entire Dataset-NDJSON content
3. Write the compressed byte stream to a file

### <a id="readingdsjc"></a>Reading a DSJC File

The process to read a DSJC file consists of:

1. Open the file and apply zLib decompression to the content
2. Process the decompressed content as Dataset-NDJSON:
   - First line: Parse as JSON object to extract metadata
   - Subsequent lines: Parse each line as a JSON array or object representing a data record

## <a id="implementation"></a>Implementation Considerations

### <a id="memoryefficiency"></a>Memory Efficiency

When processing large datasets, implementers should consider streaming approaches for both compression and decompression to avoid loading the entire dataset into memory.

### <a id="compressionlevelselection"></a>Compression Level Selection

Implementers may choose different compression levels based on their specific use case. As main purpose of the Dataset-JSON format is data exchange, the maximum compression level (9) is recommended by default.

- Level 1-3: Faster compression, lower compression ratio
- Level 4-6: Balanced compression speed and ratio
- Level 7-9: Higher compression ratio, slower compression

### <a id="errorhandling"></a>Error Handling

Implementations should gracefully handle the following error cases:

- Invalid or corrupt zLib compressed data
- Malformed JSON in the decompressed content
- Inconsistency between metadata and actual data records

### <a id="compatibility"></a>Compatibility

To ensure maximum compatibility, implementations should:

- Use standard zLib libraries available on most platforms
- Follow the Dataset-NDJSON format strictly, with proper line delimiters
- Ensure proper handling of character encodings (UTF-8 recommended)

## <a id="benefits"></a>Benefits

The DSJC format offers several benefits:

1. Reduced size: Significant reduction in file size compared to uncompressed Dataset-JSON
2. Simplified implementation: Leverages widely available zLib libraries, available in SAS, R, Python, and other languages
3. Streaming support: Enables record-by-record processing without decompressing or loading the entire dataset
4. Platform independence: Works consistently across different operating systems and programming languages

## <a id="limitations"></a>Limitations

Implementers should be aware of the following limitations:

1. Processing overhead: Compression and decompression require additional CPU resources
2. Random access: DSJC doesn't provide direct random access to specific records without decompressing the preceding content

## <a id="conformance"></a>Conformance

A conforming implementation must:

1. Correctly compress Dataset-NDJSON content using the zLib compression algorithm
2. Successfully decompress DSJC files and interpret the content as Dataset-NDJSON
3. Handle errors gracefully as specified in [Error Handling](#errorhandling)
4. Preserve all semantic information from the original Dataset-JSON content


## <a id="glossaryandabbreviations"></a>Glossary and Abbreviations

<table title="Glossary and Abbreviations">
  <tbody>
    <tr>
      <th scope="col">Term</th>
      <th scope="col">Stands for, plus Reference to CDISC Standard or source of information</th>
    </tr>
    <tr>
      <td>CPU</td>
      <td>
        Central processing unit. The primary processor in a given computer.
      </td>
    </tr>
    <tr>
      <td>DSJC</td>
      <td>
        Dataset-JSON Compressed
      </td>
    </tr>
    <tr>
      <td>JSON</td>
      <td>
        JavaScript Object Notation
      </td>
    </tr>
    <tr>
      <td>MIME</td>
      <td>
        Multipurpose Internet Mail Extensions. Two-part identifier for file formats and content formats, that defines how different types of data, such as text, images, or other binary files, can be formatted and sent over the internet.
      </td>
    </tr>
    <tr>
      <td>NDJSON</td>
      <td>
        Newline delimited JSON
      </td>
    </tr>
    <tr>
      <td>UTF-8</td>
      <td>
        Unicode Transformation Format 8-bit. A character encoding standard used for electronic communication.
      </td>
    </tr>
    <tr>
      <td>zLib</td>
      <td>
        Software library used for data compression as well as a data format
      </td>
    </tr>
  </tbody>
</table>
