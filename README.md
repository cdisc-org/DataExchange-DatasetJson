# Dataset-JSON repository

This project is used to manage the JSON representation for Clinical Datasets (a complement to the Dataset-XML representation).  The schema is automatically generated from a [LinkML](https://linkml.io/linkml/) representation of the model.

## Developer Instructions

1. Clone the repository

    ```Shell
    git clone https://github.com/cdisc-org/DataExchange-DatasetJson.git
    ```

2. Install required packages (required only once)

    ```Shell
    pip install linkml
    ```

3. Create a branch from `master` for your updates

    ```Shell
    git checkout -b feature/<new_facet>
    ```

4. Update the schema by editing the `dataset.yaml` file

5. Use [`Dataset-JSON Notebook`](dataset-json.ipynb) to see how to Generate JSON schema from LinkML; this will update file **dataset.schema.json** in the schema folder.

6. Push your branch to the upstream repository

    ```Shell
    git push -u origin feature/<new_facet>
    ```

7. Raise a Pull Request for the update

## Example Data

- The **examples/big_xpt** folder contains scripts to create a large XPT file (5Gb) from the XPT file **examples/sdtm/lb.xpt**.
- The **examples/i18n** folder contains an example of a Dataset-JSON file with non-ASCII characters: **examples/i18n/ae.json**.
- The **examples/extensions** folder contains an example of extending the Dataset-JSON schema: **examples/extensions/extension.yaml**.
