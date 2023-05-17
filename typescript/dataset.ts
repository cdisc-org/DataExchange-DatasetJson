/**
 * Enumerated set of Permissible Variable Types
 */
export type ItemType =
  | 'string'
  | 'integer'
  | 'float'
  | 'double'
  | 'decimal'
  | 'boolean';

/**
 * The first item in the data array needs to be a number (itemGroupDataSeq)
 */
export type FirstItemType = number;
export type ItemDataArray = [FirstItemType, ...Array<string | number | null>];

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
  label: string;
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
  length?: number | null;
  /**
   * Indicates that this item is a key variable in the dataset structure. It also provides an ordering for the keys.
   *
   * @TJS-type integer
   */
  keySequence?: number;
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
  records: number;
  /**
   * Name for Dataset
   *
   * @TJS-type string
   */
  name: string;
  /**
   * Label for Dataset
   *
   * @TJS-type string
   */
  label: string;
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
   * Unique identifier for Study. See ODM definition for study OID (ODM/Study/@OID).
   *
   * @TJS-type string
   */
  studyOID: string;
  /**
   * Metadata Version Identifier. See ODM definition for metadata version OID (ODM/Study/MetaDataVersion/@OID).
   *
   * @TJS-type string
   */
  metaDataVersionOID: string;
  /**
   * URL for a metadata file the describing the data.
   *
   * @TJS-type string
   */
  metaDataRef: string;
  /**
   * Object of Datasets. Key value is a unique identifier for Dataset, corresponding to ItemGroupDef/@OID in Define-XML.
   *
   * @TJS-type object
   */
  itemGroupData: {
    [name: string]: ItemGroupData;
  };
}

/**
 * Definition for Dataset-JSON
 */
export interface DatasetJson {
  /**
   * A unique identifier for this file.
   *
   * @TJS-type string
   */
  fileOID: string;
  /**
   * Time of creation of the file containing the document.
   *
   * @TJS-type string
   */
  creationDateTime: string;
  /**
   * The date/time at which the source database was queried in order to create this document.
   *
   * @TJS-type string
   */
  asOfDateTime: string;
  /**
   * Version of Dataset-JSON standard.
   *
   * @TJS-type string
   */
  datasetJSONVersion: string;
  /**
   * The organization that generated the Dataset-JSON file.
   *
   * @TJS-type string
   */
  originator: string;
  /**
   * The computer system or database management system that is the source of the information in this file.
   *
   * @TJS-type string
   */
  sourceSystem?: string;
  /**
   * The version of the "SourceSystem" above.
   *
   * @TJS-type string
   */
  sourceSystemVersion?: string;
  /**
   * Object containing study subject data.
   *
   * @TJS-type Data
   */
  clinicalData?: Data;
  /**
   * Object containing study non-subject data.
   *
   * @TJS-type Data
   */
  referenceData?: Data;
}
