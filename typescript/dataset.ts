/**
 * Enumerated set of Permissible Variable Types
 */
export type ItemType = 'string' | 'integer' | 'float' | 'double' | 'decimal' | 'boolean';

/**
* The first item in the data array needs to be a number (itemGroupDataSeq)
 */
export type FirstItemType = number;
export type ItemDataArray = [FirstItemType, ...Array<string|number|null>];

/**
 * Definition for Variable in the Dataset
 */
export interface ItemDescription {
    /**
     * Unique identifier for Variable. Must correspond to ItemDef/@OID in Define-XML.
     *
     * @TJS-type string
     */
    OID: string;
    /**
     * Name for Variable
     *
     * @TJS-type string
     */
    name: string;
    /**
     * Label for Variable
     *
     * @TJS-type string
     */
    label: string|null;
    /**
     * Data type for Variable
     *
     * @TJS-type ItemType
     */
    type: ItemType;
    /**
     * Length for Variable
     *
     * @minimum 1
     * @TJS-type integer
     */
    length?: number|null;
    /**
     * Number of digits to the right of the decimal point when the type of the variable is float
     *
     * @minimum 0
     * @TJS-type integer
     */
    fractionDigits?: number|null;
}

/**
 * Definition for Dataset
 */
export interface ItemGroupData {
    /**
     * Number of Records in Dataset
     *
     * @minimum 0
     * @TJS-type integer
     */
    records: number,
    /**
     * Name for Dataset
     *
     * @TJS-type string
     */
    name: string,
    /**
     * Label for Dataset
     *
     * @TJS-type string
     */
    label: string,
    /**
     * Array with Variable Descriptions
     *
     * @TJS-type array
     */
    items: Array<ItemDescription>;
    /**
     * Contents for Dataset. Array of records, where each record is represented as an array of values.
     *
     * @TJS-type array
     */
    itemData: Array<ItemDataArray>;
}

/**
 * Definition for Data contained in Dataset-JSON
 */
export interface Data {
        /**
         * Unique identifier for Study. See ODM specification for details.
         *
         * @TJS-type string
         */
        studyOID: string;
        /**
         * Metadata Version Identifier. See Define-XML specification for details.
         *
         * @TJS-type string
         */
        metaDataVersionOID: string;
        /**
         * Object of Datasets. Key value is a unique identifier for Dataset, corresponding to ItemGroupDef/@OID in Define-XML
         *
         * @TJS-type object
         */
        itemGroupData: {
            [name: string]: ItemGroupData;
        }
}

/**
 * Definition for Dataset-JSON
 */
export interface DatasetJson {
    /**
     * Object containing study subject data
     *
     * @TJS-type Data
     */
    clinicalData?: Data;
    /**
     * Object containing study non-subject data
     *
     * @TJS-type Data
     */
    referenceData?: Data;
}
