import React, { useState, useRef } from 'react';

function TodoItem() {
  const [task, setTask] = useState(''); // State to manage the task input
  const inputRef = useRef(null); // Reference to the input field

  // Function to handle adding a task
  const handleAddTask = () => {
    if (task.trim() === '') {
      console.log('Task cannot be empty');
      return; // Do nothing if the input is empty or just whitespace
    }

    console.log('Task Added:', task);
    
    // Clear input field after adding the task
    setTask('');

    // Check if inputRef is not null before calling focus
    if (inputRef.current) {
      inputRef.current.focus(); // Refocus the input field
    }
  };

  return (
    <div className="todo-item">
      <input
        ref={inputRef}
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)} // Update the task state when the input changes
        placeholder="Add a new task"
        className="border rounded px-2 py-1"
      />
      <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
        Add Task
      </button>
    </div>
  );
}

export default TodoItem;
