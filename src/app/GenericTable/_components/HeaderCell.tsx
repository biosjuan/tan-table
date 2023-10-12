import {
  Column,
  ColumnOrderState,
  Header,
  Table,
  flexRender,
} from '@tanstack/react-table';
import { useDrag, useDrop } from 'react-dnd';

interface DraggableColumnHeaderProps<T> {
  header: Header<T, unknown>;
  table: Table<T>;
}

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

function DraggableColumnHeader<T extends object>({
  header,
  table,
}: DraggableColumnHeaderProps<T>) {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: Column<T>) => {
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
    <th
      ref={dropRef}
      key={header.id}
      className='px-6 py-4'
      onClick={header.column.getToggleSortingHandler()}
      {...{
        colSpan: header.colSpan,
        style: {
          width: header.getSize(),
        },
      }}
    >
      <div ref={previewRef}>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        <button ref={dragRef}>
          🟰
          {!header.isPlaceholder && header.column.getIsSorted() === 'asc' && (
            <span> &and;</span>
          )}
          {!header.isPlaceholder && header.column.getIsSorted() === 'desc' && (
            <span> &or;</span>
          )}
        </button>
      </div>
      <div
        {...{
          onMouseDown: header.getResizeHandler(),
          onTouchStart: header.getResizeHandler(),
          className: `resizer ${
            header.column.getIsResizing() ? 'isResizing' : ''
          }`,
        }}
      />
    </th>
  );
}

export default DraggableColumnHeader;
