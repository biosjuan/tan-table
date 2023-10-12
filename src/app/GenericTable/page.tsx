'use client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import data from '../MOCK_DATA.json';
import { Person } from '@/Model/Person';
import TableGenerator from './_components/TableGenerator';
import { ColumnConfig } from './_models/tableColumnModel';

const columns: ColumnConfig[] = [
  {
    header: 'First Name',
    accessor: 'first_name',
    meta: {
      type: 'text',
    },
  },
  {
    header: 'Last Name',
    accessor: 'last_name',
    meta: {
      type: 'text',
    },
  },
  {
    header: 'Age',
    accessor: 'age',
    meta: {
      type: 'number',
    },
  },
  {
    header: 'Visit',
    accessor: 'visit',
    meta: {
      type: 'number',
    },
  },

  {
    header: 'Status',
    accessor: 'status',
    meta: {
      type: 'select',
      options: [
        { value: 'Complicated', label: 'Complicated' },
        { value: 'Single', label: 'Single' },
        { value: 'In_Relationship', label: 'In Relationship' },
      ],
    },
  },
  {
    header: 'Profile',
    accessor: 'profile',
    meta: {
      type: 'select',
      options: [
        { value: 'true', label: 'Active' },
        { value: '', label: 'No Active' },
      ],
    },
  },
];

const defaultObjectData: Person = {
  id: 0,
  first_name: '',
  last_name: '',
  age: 0,
  profile: false,
  status: '',
  visit: 0,
};

function Home() {
  return (
    <main className='flex min-h-screen flex-col justify-between p-24'>
      <TableGenerator
        columnConfig={columns}
        defaultData={data}
        defaultObjectData={defaultObjectData}
        tableTitle='Generic Table'
      />
    </main>
  );
}

export default Home;
