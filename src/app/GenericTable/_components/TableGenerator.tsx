import {
  AccessorFn,
  ColumnOrderState,
  ColumnResizeMode,
  ColumnSort,
  createColumnHelper,
} from '@tanstack/react-table';
import { ColumnConfig } from '../_models/tableColumnModel';
import TableCell from './TableCell';
import { useState } from 'react';
import GenericTable from './GenericTable';
import EditCell from './EditCell';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface TableGeneratorProps<T extends object> {
  defaultData: T[];
  columnConfig: ColumnConfig[];
  defaultObjectData: T;
  tableTitle: string;
  saveTableFn: (data: T[]) => void;
}

function TableGenerator<T extends object>({
  defaultData,
  columnConfig,
  defaultObjectData,
  tableTitle,
  saveTableFn,
}: TableGeneratorProps<T>) {
  // Generate the table
  const columnHelper = createColumnHelper<T>();
  const columns = columnConfig.map((column, index) => {
    return columnHelper.accessor(column.accessor as unknown as AccessorFn<T>, {
      header: column.header,
      id: index + '',
      cell: TableCell,
      meta: column.meta,
    });
  });

  // Add Action
  columns.push(
    columnHelper.display({
      header: 'Actions',
      id: 'actions',
      cell: EditCell,
    })
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <GenericTable
        columns={columns}
        defaultData={defaultData}
        defaultObjectData={defaultObjectData}
        tableTitle={tableTitle}
        saveTableFn={saveTableFn}
      />
    </DndProvider>
  );
}

export default TableGenerator;
