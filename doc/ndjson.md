# Dataset-JSON: NDJSON Representation

### Introduction

The purpose of the ndjson, or newline-delimited json, representation of Dataset-JSON is to simplify streaming 
large datasets so that the dataset can easily be read or written one row at a time. Most languages have libraries 
that can read a large json dataset as a stream, but in cases where such a library is not available the ndjson format 
makes it easy for the program read and write a row at a time. The ndjson format is an alternative to the json format 
and both are part of the Dataset-JSON standard.

In a data exchange scenario, the sender and receiver determine whether to use the json or ndjson representation of 
Dataset-JSON. Given the relative simplicity of the Dataset-JSON specification, converting between the two formats is a
straightforward process. The json Dataset-JSON example datasets have been converted to the ndjson representation using
json2ndjson.py.

### NDJSON Description

Newline-delimited json (ndjson) is a data format that uses lines to define the structure of json data. 
It's a variation of the json format, but resources are serialized without whitespace and separated by a newline pair 
(characters 13 and 10). Each line in an ndjson file is a valid json value, and ndjson files contain one row of 
data per line. 

### The Dataset-JSON NDJSON Format

The NDJSON format is created from the Dataset-JSON standard by:
* Row 1. Create 1 JSON object from the ODM and dataset attributes
* Row 2. Create 1 JSON object that contains an array of column metadata definitions
* Row 3 - n. Create 1 array per data row

![NDJSON Structure](https://github.com/cdisc-org/DataExchange-DatasetJson/blob/doc/doc/img/ndjson-json-structure.JPG?raw=true)

### Examples

The Dataset-JSON example datasets have been converted using into the ndjson format using json2ndjson.py. 
The examples are available in the examples/ndjson folder and use .ndjson as the extension.

