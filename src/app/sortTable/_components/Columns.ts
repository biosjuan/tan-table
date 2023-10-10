import { createColumnHelper } from '@tanstack/react-table';
import { Person } from '../../../Model/Person';
import TableCell from './TableCell';
import EditCell from './EditCell';

const columnHelper = createColumnHelper<Person>();

export const columns = [
  columnHelper.accessor('first_name', {
    header: 'First Name',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('last_name', {
    header: 'Last Name',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: TableCell,
    meta: {
      type: 'number',
    },
  }),
  columnHelper.accessor('visit', {
    header: 'Visit',
    cell: TableCell,
    meta: {
      type: 'number',
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('profile', {
    header: 'Profile',
    cell: TableCell,
    meta: {
      type: 'select',
      options: [
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'No Active' },
      ],
    },
  }),
  columnHelper.display({
    id: 'edit',
    cell: EditCell,
  }),
];
