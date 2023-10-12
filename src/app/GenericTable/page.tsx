'use client';
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
  // {
  //   header: 'Test Column 1',
  //   accessor: 'profile',
  //   meta: {
  //     type: 'select',
  //     options: [
  //       { value: 'true', label: 'Active' },
  //       { value: '', label: 'No Active' },
  //     ],
  //   },
  // },
  // {
  //   header: 'Test Column 2',
  //   accessor: 'profile',
  //   meta: {
  //     type: 'select',
  //     options: [
  //       { value: 'true', label: 'Active' },
  //       { value: '', label: 'No Active' },
  //     ],
  //   },
  // },
  // {
  //   header: 'Test Column 3',
  //   accessor: 'profile',
  //   meta: {
  //     type: 'select',
  //     options: [
  //       { value: 'true', label: 'Active' },
  //       { value: '', label: 'No Active' },
  //     ],
  //   },
  // },
  // {
  //   header: 'Test Column 4',
  //   accessor: 'profile',
  //   meta: {
  //     type: 'select',
  //     options: [
  //       { value: 'true', label: 'Active' },
  //       { value: '', label: 'No Active' },
  //     ],
  //   },
  // },
  // {
  //   header: 'Test Column 5',
  //   accessor: 'profile',
  //   meta: {
  //     type: 'select',
  //     options: [
  //       { value: 'true', label: 'Active' },
  //       { value: '', label: 'No Active' },
  //     ],
  //   },
  // },
  // {
  //   header: 'Test Column 6',
  //   accessor: 'profile',
  //   meta: {
  //     type: 'select',
  //     options: [
  //       { value: 'true', label: 'Active' },
  //       { value: '', label: 'No Active' },
  //     ],
  //   },
  // },
  // {
  //   header: 'Test Column 7',
  //   accessor: 'profile',
  //   meta: {
  //     type: 'select',
  //     options: [
  //       { value: 'true', label: 'Active' },
  //       { value: '', label: 'No Active' },
  //     ],
  //   },
  // },
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
  const saveTableFn = (data: Person[]) => {
    console.log(data[0]);
  };

  return (
    <main className='flex min-h-screen flex-col justify-between p-24'>
      <TableGenerator
        columnConfig={columns}
        defaultData={data}
        defaultObjectData={defaultObjectData}
        tableTitle='Generic Table'
        saveTableFn={saveTableFn}
      />
    </main>
  );
}

export default Home;
