import React from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Task from './task';

const Columns = ({ tasks }: any) => {
  return (
    <div className='w-full bg-slate-400'>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task: any) => (
          <Task id={task.id} title={task.title} key={task.id}></Task>
          // <h3 key={task.id}>{task.title}</h3>
        ))}
      </SortableContext>
    </div>
  );
};

export default Columns;
