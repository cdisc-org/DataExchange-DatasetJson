from jsonschema import validate
import json

def convert_1_0_to_1_1(old):
    new = {
        "asOfDateTime": old.get("asOfDateTime", ""),
        "columns": [],
        "creationDateTime": old.get("creationDateTime", ""),
        "datasetJSONVersion": old.get("datasetJSONVersion", ""),
        "fileOID": old.get("fileOID", ""),
        "label": old.get("fileOID", ""),
        "metaDataRef": old.get("metaDataRef", ""),
        "metaDataVersionOID": old.get("metaDataVersionOID", ""),
        "name": old.get("fileOID", ""), 
        "originator": old.get("originator", ""),
        "records": 0,
        "sourceSystem": old.get("sourceSystem", ""),
        "sourceSystemVersion": old.get("sourceSystemVersion", ""),
        "studyOID": old.get("studyOID", ""),
    }
    
    for data_type in ["clinicalData", "referenceData"]:
        if data_type in old:
            for item_group_oid, item_group_data in old[data_type]["itemGroupData"].items():
                new['itemGroupOID'] = item_group_oid
                new['name'] = item_group_data.get('name') or new['name']
                new['label'] = item_group_data.get('label') or new['label']
                columns = []
                for item in item_group_data["items"]:
                    column = {
                        "dataType": item["type"],
                        "displayFormat": item.get("displayFormat", ""),
                        "itemOID": item["OID"],
                        "keySequence": item.get("keySequence", 0),
                        "label": item["label"],
                        "length": item.get("length", 0),
                        "name": item["name"],
                        "targetDataType": item["type"]
                    }
                    columns.append(column)
                new["columns"].extend(columns)

                def array_generator():
                    for row in item_group_data.get("itemData",[]):
                        yield row
                array_iter = iter(array_generator())
                first_row = next(array_iter, None)
                new['records'] = item_group_data.get('records')
                if first_row is not None:
                    new['records'] = new['records'] or 1 + sum(1 for _ in array_iter)
                    new['rows'] = item_group_data.get('itemData')
                else:
                    print("No rows found.")

    return new

def process_json_file(filename, new_filename, schema = 'schema/dataset.schema.json'):
    assert filename
    new_filename = new_filename or filename

    with open(filename, 'r') as file:
        old_json_data = json.load(file)    

    new_json_data = convert_1_0_to_1_1(old_json_data)

    with open(schema, 'r') as schema_file:
        validation_findings = validate(instance = new_json_data, schema = json.load(schema_file))
    if not validation_findings:
        with open(new_filename, 'w') as new_file:
            json.dump(new_json_data, new_file, indent=4)
    else:
        print('Validation issues found with', filename)
