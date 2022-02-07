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
     * @OID.type string
     * @OID.minimum 1
     * @OID.maximum 1
     */
    OID: string;
    /**
     * Name for Item.
     *
     * @name.type string
     * @name.minimum 1
     * @name.maximum 1
     */
    name: string;
    /**
     * Label for Item
     * 
     * @label.type string
     * @label.minimum 0
     * @label.maximum 1
     */
    label?: string;
    /**
     * Item data type
     * 
     * @type.type ItemType
     * @type.minimum 0
     * @type.maximum 
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
