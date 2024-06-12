from jsonschema import validate
import json

def convert_1_0_to_1_1(old, date_formats = ['yymmdd', 'date', 'iso8601']):
    new = {
        "asOfDateTime": old.get("asOfDateTime"),
        "columns": [],
        "creationDateTime": old.get("creationDateTime"),
        "datasetJSONVersion": "1.1.0",
        "fileOID": old.get("fileOID"),
        "label": old.get("fileOID"),
        "name": old.get("fileOID"), 
        "originator": old.get("originator"),
        "records": 0,
        "sourceSystem": old.get("sourceSystem"),
        "sourceSystemVersion": old.get("sourceSystemVersion"),
    }
    
    for data_type in ["clinicalData", "referenceData"]:
        data = old.get(data_type)
        if not data:
            continue
        new["metaDataRef"] = data.get("metaDataRef")
        new["metaDataVersionOID"] = data.get("metaDataVersionOID")
        new["studyOID"] = data.get("studyOID")

        for item_group_oid, item_group_data in data["itemGroupData"].items():        
            new['itemGroupOID'] = item_group_oid
            new['name'] = item_group_data.get('name') or new['name']
            new['label'] = item_group_data.get('label') or new['label']
            columns = []
            for item in item_group_data["items"]:
                is_date = any(match in item.get("displayFormat", "").lower() for match in date_formats)
                column = {
                    "dataType": item["type"],
                    "displayFormat": item.get("displayFormat", None),
                    "itemOID": item["OID"],
                    "keySequence": item.get("keySequence", None),
                    "label": item["label"],
                    "length": item.get("length", None),
                    "name": item["name"],
                    "targetDataType": "date" if is_date else None
                }
                columns.append({k:v for k,v in column.items() if v is not None})
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

    return {k:v for k,v in new.items() if v is not None}

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
            json.dump(new_json_data, new_file)
    else:
        print('Validation issues found with', filename)
