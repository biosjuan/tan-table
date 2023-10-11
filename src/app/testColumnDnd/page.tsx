'use client';
import React, { FC } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import {
  Column,
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  Header,
  Table,
  useReactTable,
} from '@tanstack/react-table';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Person } from '@/Model/Person';
import defaultData from '../MOCK_DATA.json';

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorFn: (row) => row.first_name,
    id: 'firstName',
    header: 'First Name',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.last_name,
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'age',
    id: 'age',
    header: 'Age',
    footer: (props) => props.column.id,
  },

  {
    accessorKey: 'visit',
    id: 'visit',
    header: 'Visits',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Status',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'progress',
    id: 'progress',
    header: 'Profile Progress',
    footer: (props) => props.column.id,
  },
];

const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  );
  return [...columnOrder];
};

const DraggableColumnHeader: FC<{
  header: Header<Person, unknown>;
  table: Table<Person>;
}> = ({ header, table }) => {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: Column<Person>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  });

  return (
    <th ref={dropRef} colSpan={header.colSpan}>
      <div ref={previewRef}>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        <button ref={dragRef}>🟰</button>
      </div>
    </th>
  );
};

function Home() {
  const [data, setData] = React.useState(() => [...defaultData]);
  const [columns] = React.useState(() => [...defaultColumns]);

  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    columns.map((column) => column.id as string) //must start out with populated columnOrder so we can splice
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <main className='flex min-h-screen flex-col justify-between p-24'>
      <DndProvider backend={HTML5Backend}>
        <div className='p-2'>
          <div className='h-4' />
          <div className='h-4' />
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <DraggableColumnHeader
                      key={header.id}
                      header={header}
                      table={table}
                    />
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
          <pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre>
        </div>
      </DndProvider>
    </main>
  );
}

export default Home;
