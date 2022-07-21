export type createRecordType = {
  tableName: string;
  columnObject: { [columnKey: string]: number | string | undefined};
};

export type readRecordType = {
  tableName: string;
  searchBy: string[];
  value: Array<string | number>;
};

export type updateRecordType = {
  tableName: string;
  columnObject: { [columnKey: string]: number | string | undefined};
  searchBy: string[];
  value: Array<string | number>;
};

export type deleteRecordType = {
  tableName: string;
  searchBy: string[];
  value: Array<number | string>;
};
