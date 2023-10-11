'use client';
import { MouseEvent } from 'react';

// ColumnDefTemplate<CellContext<Student, unknown>> | undefined'.
const EditCell: React.FC<any> = ({ row, table }) => {
  const meta = table.options.meta;
  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    // console.log('juan', row.id);
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));

    if (elName !== 'edit') {
      meta?.revertData(row.index, e.currentTarget.name === 'cancel');
    }
  };

  const removeRow = () => {
    meta?.removeRow(row.index);
  };
  // console.log(row.id, meta.editedRows[row.id]);
  return (
    <div className='flex space-x-3'>
      {meta?.editedRows[row.id] ? (
        <div className='flex space-x-3'>
          <button
            className='rounded-full bg-pink-300 text-pink-700 p-2'
            onClick={setEditedRows}
            name='cancel'
          >
            X
          </button>{' '}
          <button
            className='rounded-full bg-green-300 text-green-700 p-2'
            onClick={setEditedRows}
            name='done'
          >
            ✔
          </button>
        </div>
      ) : (
        <div className='flex space-x-3'>
          <button
            onClick={setEditedRows}
            name='edit'
            className='rounded-full bg-blue-300 text-blue-700 p-2'
          >
            ✐
          </button>
          <button
            onClick={removeRow}
            name='remove'
            className='rounded-full bg-pink-300 text-pink-700 p-2'
          >
            ⚊
          </button>
          <input
            type='checkbox'
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      )}
    </div>
  );
};

export default EditCell;
