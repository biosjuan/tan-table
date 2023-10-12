interface Options {
  value: string;
  label: string;
}

interface Meta {
  type: 'number' | 'text' | 'date' | 'select';
  options?: Options[];
}

export interface ColumnConfig {
  header: string;
  accessor: string;
  meta: Meta;
}
