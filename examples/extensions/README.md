# Extensions 

Having the ability to provide extensions to the Dataset-JSON specification would allow creators and consumers of the format to provide extra relevant metadata key to establishing semantic interoperability.  JSON is not as straight-forward to 'extend' the schema as XML, in fact the specification is classed as a constraint language, and can be viewed as being subtractive, rather than additive.  Given the need for an extension mechanism, it behoves the development to define some guidance as to how that could be achieved.  

Key to this are:
* how to declare a set of extensions (a namespace)
* how to declare and document an extension
* how to populate the extensions

The [extension](extension.yaml) is a LinkML file with the schema required for extensions.  A collated schema can be generated per the below commands.

## Constraints
Similarly to the ODM, constraints are required on the extension schema and intent.

Requirements for extensions to the Dataset-JSON model are:
1. Vendors must supply an updated Dataset-JSON Schema fully describing their extended Dataset-JSON format.
2. The extension may add new attributes, but may not render any standard Dataset-JSON attribute obsolete. Extensions cannot be used for information that is normally expressed using other Dataset-JSON attributes.
3. For extensions represented in Dataset-JSON, all new attributes must use a distinct "namespace" attribute to ensure that there are no naming conflicts with other 4. extensions. Because JSON does not support namespaces, extensions represented in Dataset-JSON must ensure no naming conflicts exist with the Dataset-JSON-standard as well as any other extensions involved in the targeted use cases.
4. Removing all extensions from an extended Dataset-JSON file must result in a meaningful and accurate standard Dataset-JSON file.
5. Implementers should be able to produce Dataset-JSON files free of any extensions upon request.
6. Applications that use extended Dataset-JSON files must also accept standard Dataset-JSON files.

## References
Check the Specification ([Dataset-JSON+Extensions](https://wiki.cdisc.org/display/DSJSON1DOT1/Dataset-JSON+Extensions)) for any addenda on the use of Dataset-JSON extensions

## Generating the extended schema
The extended schema can be generated using the following command (following instructions in [README.md](../../README.md) for initial setup)

```shell
gen-json-schema examples/extensions/extension.yaml --closed --include-range-class-descendants --mergeimports -i > schema/generated_dataset_extension.schema.json
```

## Examples 
There are a couple of examples in the [extended_dataset](extended_dataset.json) for information.