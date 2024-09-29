import React, { useState } from 'react';

function SideBar({ onAddTask, onSearch, onSort }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Low');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask({
        id: Date.now(),
        title: newTaskTitle,
        priority: newTaskPriority,
        dueDate: newTaskDueDate,
        completed: false,
      });
      setNewTaskTitle('');
      setNewTaskPriority('Low');
      setNewTaskDueDate('');
    }
  };

  return (
    <div className="w-64 p-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <input
        type="text"
        className="w-full p-2 rounded bg-white dark:bg-gray-700 mb-4"
        placeholder="Search tasks..."
        onChange={onSearch}
      />
      <select
        className="w-full p-2 rounded bg-white dark:bg-gray-700 mb-4"
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="priority">Priority</option>
        <option value="date">Due Date</option>
      </select>

      <h2 className="text-xl font-bold mt-6 mb-4">Add Task</h2>
      <input
        type="text"
        className="w-full p-2 rounded bg-white dark:bg-gray-700 mb-4"
        placeholder="Task title"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <select
        className="w-full p-2 rounded bg-white dark:bg-gray-700 mb-4"
        value={newTaskPriority}
        onChange={(e) => setNewTaskPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        className="w-full p-2 rounded bg-white dark:bg-gray-700 mb-4"
        value={newTaskDueDate}
        onChange={(e) => setNewTaskDueDate(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white py-2 rounded"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
}

export default SideBar;
