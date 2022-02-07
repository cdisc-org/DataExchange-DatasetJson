/**
 * Enumerated set of Permissible Item Types
 */
export type ItemType = 'string' | 'integer' | 'float' | 'double';

/**
 * Definition for Item in the Dataset
 */
export interface ItemDescription {
    /**
     * Unique Identifier for Item.
     *
     * @TJS-type string
     * @minimum 1
     * @maximum 1
     */
    OID: string;
    /**
     * Name for Item.
     *
     * @TJS-type string
     * @minimum 1
     * @maximum 1
     */
    name: string;
    /**
     * Label for Item
     * 
     * @TJS-type string
     * @minimum 0
     * @maximum 1
     */
    label?: string;
    /**
     * Item data type
     * 
     * @TJS-type ItemType
     * @minimum 0
     * @maximum 1
     */
    type?: ItemType;
}

export interface ItemGroupData {
    records: number,
    name: string,
    label: string,
    items: Array<ItemDescription>;
    itemData: Array<Array<string|number|null>>;
}

export interface Data {
        studyOID: string;
        metaDataVersionOID: string;
        itemGroupData: {
            [name: string]: ItemGroupData;
        }
}

export interface DatasetJson {
    clinicalData?: Data;
    referenceData?: Data;
}
