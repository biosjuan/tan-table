'use client';
import { ChangeEvent, useEffect, useState } from 'react';

type Option = {
  label: string;
  value: string;
};

const TableCell: React.FC<{
  getValue: any;
  row: any;
  column: any;
  table: any;
}> = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  const isSelectType = columnMeta.type === 'select';

  if (tableMeta?.editedRows[row.id]) {
    return (
      <>
        {isSelectType ? (
          <select
            onChange={onSelectChange}
            value={initialValue}
            className='block w-max-context py-2 pl-3 pr-10 mt-1 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            {columnMeta?.options?.map((option: Option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={`${
              isSelectType ? 'input-like-select' : '' // Add the same custom class for styling
            } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 pl-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            type={column.columnDef.meta?.type || 'text'}
          />
        )}
      </>
    );
  }

  if (typeof value === 'boolean') {
    return <span>{value ? 'Active' : 'No Active'}</span>;
  }

  if (value === 'true') {
    return <span>{value === 'true' ? 'Active' : 'No Active'}</span>;
  }

  return <span>{value}</span>;
};

export default TableCell;
