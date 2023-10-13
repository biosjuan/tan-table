const FooterCell: React.FC<any> = ({ table }) => {
  const meta = table.options.meta;
  const selectedRows = table.getSelectedRowModel().rows;
  const removeRows = () => {
    meta.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row: { index: any }) => row.index)
    );
    table.resetRowSelection();
  };
  return (
    <div className='px-2 py-1 bg-transparent border-none flex space-x-3 justify-start'>
      {selectedRows.length > 0 ? (
        <button className='' onClick={removeRows}>
          Remove Selected x
        </button>
      ) : null}
      <button onClick={meta?.addRow}>Add New +</button>
    </div>
  );
};

export default FooterCell;
