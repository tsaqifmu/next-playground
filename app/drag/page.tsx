// app/page.tsx (sesuaikan jika struktur folder berbeda)
'use client';

import Columns from '@/components/columns';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';

export default function page() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'satu',
    },
    {
      id: 2,
      title: 'dua',
    },
    {
      id: 3,
      title: 'tiga',
    },
  ]);

  const getTaskPos = (id: any) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  console.log('tasks', tasks);
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className=' w-1/2'>
        <h3>Haloo</h3>

        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <Columns tasks={tasks}></Columns>
        </DndContext>
      </div>
    </div>
  );
}
