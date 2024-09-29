import React, { useState, useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import SearchBar from "./components/SearchBar";
import SortOptions from "./components/SortOption";
import CalendarComponent from "./components/CalendarComponent";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortOption === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto py-8 px-4">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Todo App</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-800 text-white dark:bg-gray-100 dark:text-black rounded"
          >
            Toggle Dark Mode
          </button>
        </header>

        <main>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AddTodoForm addTask={addTask} editTask={editTask} editingTask={editingTask} />
              <div className="mt-4">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              </div>
              <div className="mt-2">
                <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
              </div>
              <TodoList
                tasks={sortedTasks}
                editTask={setEditingTask}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                setTasks={setTasks}
              />
            </div>
            <div>
              <CalendarComponent tasks={tasks} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
