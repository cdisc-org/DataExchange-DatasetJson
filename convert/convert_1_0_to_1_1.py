from jsonschema import validate
from collections import OrderedDict
import json

def convert_1_0_to_1_1(old, date_formats = ['yymmdd', 'date', 'e8601da']):
    new = OrderedDict({
        "datasetJSONCreationDateTime": old.get("creationDateTime"),
        "datasetJSONVersion": "1.1.0",
        "fileOID": old.get("fileOID"),
        "dbQueryDateTime": old.get("asOfDateTime"),
        "dbLastModifiedDateTime": None,
        "originator": old.get("originator"),
        "sourceSystem": {},
        "studyOID": None,
        "metaDataVersionOID": None,
        "metaDataRef": None,
        "itemGroupOID": None,
        "isReferenceData":None,
        "records": 0,
        "name": old.get("fileOID"),
        "label": old.get("fileOID"),
        "columns": [],
        "rows": [],
    })

    if old.get("sourceSystem"):
      new["sourceSystem"]["name"] = old.get("sourceSystem", None)
    if old.get("sourceSystemVersion"):
      new["sourceSystem"]["version"] = old.get("sourceSystemVersion", None)

    for data_type in ["clinicalData", "referenceData"]:
        data = old.get(data_type)
        if not data:
            continue
        if (data_type == "referenceData"):
            new["isReferenceData"] = True
        new["metaDataRef"] = data.get("metaDataRef")
        new["metaDataVersionOID"] = data.get("metaDataVersionOID")
        new["studyOID"] = data.get("studyOID")

        for item_group_oid, item_group_data in data["itemGroupData"].items():
            new['itemGroupOID'] = item_group_oid
            new['name'] = item_group_data.get('name') or new['name']
            new['label'] = item_group_data.get('label') or new['label']
            columns = []
            for item in item_group_data["items"]:

                column = OrderedDict({
                    "itemOID": item["OID"],
                    "name": item["name"],
                    "label": item["label"],
                    "dataType": item["type"],
                    "targetDataType": None,
                    "length": item.get("length", None),
                    "displayFormat": item.get("displayFormat", None),
                    "keySequence": item.get("keySequence", None)
                })

                if any(f in item.get("displayFormat", "").lower() for f in date_formats):
                    column["dataType"] = "date"
                    column["targetDataType"] = item["type"]
                    column["displayFormat"] = "E8601DA." # this is not required, but good for the example.
                elif item["type"] == "decimal":
                    column["dataType"] = "decimal"
                    column["targetDataType"] = item["type"]

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
