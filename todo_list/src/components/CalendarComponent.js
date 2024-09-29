// src/components/CalendarComponent.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSameDay } from "date-fns";

function CalendarComponent({ tasks }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tasksForSelectedDate = tasks.filter(task =>
    isSameDay(new Date(task.dueDate), selectedDate)
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          if (tasks.some(task => isSameDay(new Date(task.dueDate), date))) {
            return "bg-blue-200 dark:bg-blue-600 rounded-full";
          }
        }}
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold dark:text-white">Tasks for {format(selectedDate, 'yyyy-MM-dd')}</h2>
        {tasksForSelectedDate.length === 0 ? (
          <p className="dark:text-gray-300">No tasks due.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {tasksForSelectedDate.map(task => (
              <li key={task.id} className="p-2 bg-white dark:bg-gray-700 rounded shadow">
                {task.name} - <span className={`text-sm ${task.priority === "High" ? "text-red-500" : task.priority === "Medium" ? "text-yellow-500" : "text-green-500"}`}>{task.priority}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CalendarComponent;
