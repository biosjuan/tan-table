import { createColumnHelper } from '@tanstack/react-table';
import { Person } from '../../../Model/Person';
import TableCell from './TableCell';
import EditCell from './EditCell';

const columnHelper = createColumnHelper<Person>();

export const columns = [
  columnHelper.accessor('first_name', {
    header: 'First Name',
    id: 'first_name',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('last_name', {
    header: 'Last Name',
    id: 'last_name',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    id: 'age',
    cell: TableCell,
    meta: {
      type: 'number',
    },
  }),
  columnHelper.accessor('visit', {
    header: 'Visit',
    id: 'visit',
    cell: TableCell,
    meta: {
      type: 'number',
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    id: 'status',
    cell: TableCell,
    meta: {
      type: 'select',
      options: [
        { value: 'Complicated', label: 'Complicated' },
        { value: 'Single', label: 'Single' },
        { value: 'In_Relationship', label: 'In Relationship' },
      ],
    },
  }),
  columnHelper.accessor('profile', {
    header: 'Profile',
    id: 'profile',
    cell: TableCell,
    meta: {
      type: 'select',
      options: [
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'No Active' },
      ],
    },
  }),
  columnHelper.accessor('last_name', {
    header: 'Test',
    id: 'test1',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),

  columnHelper.accessor('last_name', {
    header: 'Test',
    id: 'test2',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),

  columnHelper.accessor('last_name', {
    header: 'Test',
    id: 'test3',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),

  columnHelper.accessor('last_name', {
    header: 'Test',
    id: 'test4',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),

  columnHelper.accessor('last_name', {
    header: 'Test',
    id: 'test5',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),

  columnHelper.accessor('last_name', {
    header: 'Test',
    id: 'test6',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),

  columnHelper.accessor('last_name', {
    header: 'Test',
    id: 'test7',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),

  columnHelper.display({
    header: 'Actions',
    id: 'edit',
    cell: EditCell,
  }),
];
