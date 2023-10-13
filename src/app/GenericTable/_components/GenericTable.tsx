'use client';
import { useEffect, useState } from 'react';

import {
  ColumnOrderState,
  ColumnResizeMode,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';

import './table.css';
import FooterCell from './FooterCell';
import DraggableColumnHeader from './HeaderCell';

interface TableProps<T extends object> {
  defaultData: T[];
  columns: ColumnDef<T>[];
  defaultObjectData: T;
  tableTitle: string;
  saveTableFn: (data: T[]) => void;
}

function GenericTable<T extends object>({
  defaultData,
  columns,
  defaultObjectData,
  tableTitle,
  saveTableFn,
}: TableProps<T>) {
  const [data, setData] = useState<T[]>(() => [...defaultData]);
  const [originalData, setOriginalData] = useState(() => [...defaultData]);
  const [editedRows, setEditedRows] = useState({});
  const [rowId, setRowId] = useState({ id: 0 });

  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [filtering, setFiltering] = useState('');

  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>('onChange');

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((col) => col.id as string)
  );

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    initialState: {
      pagination: { pageSize: 5 },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,

    onColumnOrderChange: setColumnOrder,

    state: {
      sorting: sorting,
      globalFilter: filtering,
      columnOrder: columnOrder,
    },
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              console.log(rowIndex, columnId, value);
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      addRow: () => {
        const newRow = defaultObjectData;
        console.log('add');
        const updatedData = [newRow, ...data];
        setData(updatedData);
        setOriginalData(updatedData);

        setEditedRows((old: []) => ({
          ...old,
          [rowId.id]: true,
        }));
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: T[]) =>
          old.filter((_row: T, index: number) => index !== rowIndex);
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
      removeSelectedRows: (selectedRows: number[]) => {
        const setFilterFunc = (old: T[]) =>
          old.filter((_row, index) => !selectedRows.includes(index));
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
    },
  });

  return (
    <div className='max-w-full overflow-x-auto'>
      <div className='w-full'>
        <div className='shadow-md bg-white dark:bg-neutral-800 overflow-x-auto sm:rounded-lg border rounded-md dark:border-neutral-500 pt-10 pb-10 pl-3 pr-3'>
          <div className='mb-3'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch '>
              <div className='flex items-center mb-2'>
                <span className='text-xl font-bold text-gray-600 mr-20'>
                  {tableTitle}
                </span>
              </div>
              <div className='relative flex-auto justify-end'>
                <input
                  type='search'
                  className='absolute right-0 block w-f rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding pl-3 pr-10 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
                  placeholder='Search'
                  aria-label='Search'
                  aria-describedby='button-addon2'
                  value={filtering}
                  onChange={(e) => setFiltering(e.target.value)}
                />
                <span className='absolute inset-y-0 right-3 flex items-center pointer-events-none'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='h-5 w-5 text-neutral-700 dark:text-neutral-200'
                  >
                    <path
                      fillRule='evenodd'
                      d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table
              className='w-full text-left text-sm font-light border rounded-md dark:border-neutral-500'
              {...{
                style: {
                  width: table.getCenterTotalSize(),
                },
              }}
            >
              <thead className='border-b font-medium dark:border-neutral-500'>
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
                  <tr key={row.id} className='border-b dark:border-neutral-500'>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className='whitespace-nowrap px-6 py-4'>
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
                <tr>
                  <th
                    colSpan={table.getCenterLeafColumns().length}
                    align='right'
                  >
                    <FooterCell table={table} />
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className='flex flex-col items-end'>
            <div className='flex flex-col md:flex-row items-end md:items-center space-y-2 md:space-x-4'>
              <button
                className='bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 mt-2 border border-blue-700 rounded'
                onClick={() => saveTableFn(data)}
              >
                Save Table
              </button>
              <div className='flex items-center space-x-4 mt-2'>
                <label htmlFor='dropdown' className='text-sm text-gray-600'>
                  Show
                </label>
                <select
                  id='dropdown'
                  className='ml-auto px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none'
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[5, 10, 25].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
                <div className='text-sm text-gray-600'>
                  of{' '}
                  {table.getPageCount() * table.getState().pagination.pageSize}
                </div>
              </div>
              <nav
                className='isolate ml-auto inline-flex -space-x-px rounded-md shadow-sm'
                aria-label='Pagination'
              >
                <a
                  href='#'
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the link from navigating
                    if (!table.getCanPreviousPage()) {
                      return; // Disable the link if necessary
                    }
                    table.setPageIndex(0); // Perform the action
                  }}
                  className={`relative inline-flex items-center rounded-l-md px-4 py-3 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${
                    !table.getCanPreviousPage()
                      ? 'text-gray-400 bg-gray-200 cursor-not-allowed' // Apply disabled styles
                      : 'text-gray-900  hover:bg-gray-100 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  <span className='sr-only'>Previous</span>
                  &lt;&lt;
                </a>
                <a
                  href='#'
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the link from navigating
                    if (!table.getCanPreviousPage()) {
                      return; // Disable the link if necessary
                    }
                    table.previousPage(); // Perform the action
                  }}
                  className={`relative inline-flex items-center px-4 py-3 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${
                    !table.getCanPreviousPage()
                      ? 'text-gray-400 bg-gray-200 cursor-not-allowed' // Apply disabled styles
                      : 'text-gray-900  hover:bg-gray-100 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  <span className='sr-only'>Previous</span>
                  &lt;
                </a>

                {Array.from({ length: Math.min(3, table.getPageCount()) }).map(
                  (_, index) => {
                    let pageIndex: number;
                    if (table.getPageCount() <= 3) {
                      pageIndex = index + 1;
                    } else if (
                      table.getState().pagination.pageIndex >=
                      table.getPageCount() - 3
                    ) {
                      pageIndex = table.getPageCount() - (2 - index);
                    } else {
                      pageIndex =
                        table.getState().pagination.pageIndex + index + 1;
                    }
                    return (
                      <a
                        key={pageIndex}
                        href='#'
                        onClick={(e) => {
                          e.preventDefault();
                          table.setPageIndex(pageIndex - 1);
                        }}
                        className={`relative inline-flex items-center px-4 py-3 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0
                         ${
                           pageIndex ===
                           table.getState().pagination.pageIndex + 1
                             ? `text-gray-100 bg-blue-700`
                             : `text-gray-900 hover:bg-gray-100 `
                         }`}
                      >
                        {pageIndex}
                      </a>
                    );
                  }
                )}

                <a
                  href='#'
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the link from navigating
                    if (!table.getCanNextPage()) {
                      return; // Disable the link if necessary
                    }
                    table.nextPage(); // Perform the action
                  }}
                  className={`relative inline-flex items-center px-4 py-3 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${
                    !table.getCanNextPage()
                      ? 'text-gray-400 bg-gray-200 cursor-not-allowed' // Apply disabled styles
                      : 'text-gray-900  hover:bg-gray-100 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  <span className='sr-only'>Next</span>
                  &gt;
                </a>
                <a
                  href='#'
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the link from navigating
                    if (!table.getCanNextPage()) {
                      return; // Disable the link if necessary
                    }
                    table.setPageIndex(table.getPageCount() - 1); // Perform the action
                  }}
                  className={`relative inline-flex items-center rounded-r-md  px-4 py-3 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${
                    !table.getCanNextPage()
                      ? 'text-gray-400 bg-gray-200 cursor-not-allowed' // Apply disabled styles
                      : 'text-gray-900  hover:bg-gray-100 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  &gt;&gt;
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className='flex space-x-10 max-w-screen-lg mx-auto'>
        <pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre>
        <pre>{JSON.stringify(data, null, '\t')}</pre>
      </div>
    </div>
  );
}
export default GenericTable;
