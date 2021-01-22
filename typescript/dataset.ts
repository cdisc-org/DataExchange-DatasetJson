export type ItemType = 'string' | 'integer' | 'float' | 'double';

export interface ItemDescription {
    OID: string;
    name: string;
    label?: string;
    type?: ItemType;
}

export interface ItemGroupData {
    items: Array<ItemDescription>;
    itemData: Array<Array<string|number>>;
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
