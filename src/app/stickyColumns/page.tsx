'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Table } from './_components/StickyColTable';

function Home() {
  return (
    <main className='flex min-h-screen flex-col justify-between p-24'>
      <DndProvider backend={HTML5Backend}>
        <Table />
      </DndProvider>
    </main>
  );
}

export default Home;
