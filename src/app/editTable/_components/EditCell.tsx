'use client';
import { MouseEvent } from 'react';

// ColumnDefTemplate<CellContext<Student, unknown>> | undefined'.
const EditCell: React.FC<any> = ({ row, table }) => {
  const meta = table.options.meta;
  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));

    if (elName !== 'edit') {
      meta?.revertData(row.index, e.currentTarget.name === 'cancel');
    }
  };

  return meta?.editedRows[row.id] ? (
    <>
      <button
        onClick={setEditedRows}
        name='cancel'
        className='rounded-full bg-pink-300 text-pink-700 p-2'
      >
        X
      </button>{' '}
      <button
        onClick={setEditedRows}
        name='done'
        className='rounded-full bg-green-300 text-green-700 p-2'
      >
        ✔
      </button>
    </>
  ) : (
    <button
      onClick={setEditedRows}
      name='edit'
      className='rounded-full bg-blue-300 text-blue-700 p-2'
    >
      ✐
    </button>
  );
};

export default EditCell;
