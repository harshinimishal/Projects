import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

function TaskCard({ task, onComplete, onDelete }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => {
      // Handle drag-and-drop logic here
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md ${isDragging ? 'opacity-50' : ''}`}
    >
      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{task.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">
        Priority: <span className="font-semibold">{task.priority}</span>
      </p>
      <p className="text-gray-600 dark:text-gray-400">Due: {task.dueDate}</p>
      <div className="flex items-center justify-between mt-4">
        <button
          className={`px-2 py-1 rounded ${task.completed ? 'bg-green-500' : 'bg-gray-400'}`}
          onClick={() => onComplete(task.id)}
        >
          {task.completed ? 'Completed' : 'Incomplete'}
        </button>
        <button className="text-red-500" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
