import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddTodoForm({ addTask, editTask, editingTask }) {
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name);
      setCategory(editingTask.category);
      setPriority(editingTask.priority);
      setDueDate(new Date(editingTask.dueDate));
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    const newTask = {
      id: editingTask ? editingTask.id : Date.now(),
      name: taskName,
      category,
      priority,
      dueDate: dueDate.toISOString(),
      completed: false,
    };

    if (editingTask) {
      editTask(newTask);
    } else {
      addTask(newTask);
    }

    resetForm();
  };

  const resetForm = () => {
    setTaskName("");
    setCategory("Work");
    setPriority("Medium");
    setDueDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <div>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add a task..."
          className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div className="flex space-x-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white w-1/3"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="School">School</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white w-1/3"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          className="w-1/3 p-2 border rounded dark:bg-gray-700 dark:text-white"
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default AddTodoForm;
