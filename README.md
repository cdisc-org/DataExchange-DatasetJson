# Dataset-JSON repository
This project is used to manage the JSON representation for Clinical Datasets (a complement to the Dataset-XML representation).  The schema is automatically generated from a [Typescript](https://www.typescriptlang.org/) representation of the model.

## Developer Instructions

1. Clone the repository
    ```
    git clone https://github.com/cdisc-org/DataExchange-DatasetJson.git
    ```
2. Install required packages (required only once)
    ```
    cd typescript
    npm install
    ```
3. Create a branch from `main` for your updates
    ```
    git checkout -b feature/<new_facet>
    ```
4. Update the schema by editing the `dataset.ts` file 
5. Convert Typescript definitions to JSON Schema; this will update file **dataset.schema.json** in the schema folder.
    ```
    npm run schema
    ```
6. Push your branch to the upstream repository
    ```
    git push -u origin feature/<new_facet>
    ```
7. Raise a Pull Request for the update
