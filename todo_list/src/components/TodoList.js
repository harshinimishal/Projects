import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";

function TodoList({ tasks, editTask, deleteTask, toggleComplete, setTasks }) {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  return (
    <div className="mt-6">
      {tasks.length === 0 ? (
        <p className="text-center dark:text-white">No tasks available.</p>
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                className="space-y-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 rounded-lg shadow transition transform ${
                          snapshot.isDragging ? "bg-blue-100 dark:bg-blue-900" : "bg-white dark:bg-gray-800"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p
                              className={`text-lg font-semibold ${
                                task.completed ? "line-through text-gray-500 dark:text-gray-400" : "dark:text-white"
                              }`}
                            >
                              {task.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {task.category} | {format(new Date(task.dueDate), "yyyy-MM-dd")}
                            </p>
                            <p className={`text-xs font-bold ${task.priority === "High" ? "text-red-500" : "text-gray-500"}`}>
                              {task.priority} Priority
                            </p>
                          </div>
                          <div className="space-x-2">
                            <button
                              onClick={() => toggleComplete(task.id)}
                              className={`p-2 rounded ${
                                task.completed ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                              }`}
                            >
                              {task.completed ? "Completed" : "Complete"}
                            </button>
                            <button
                              onClick={() => editTask(task)}
                              className="p-2 bg-yellow-500 text-white rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-2 bg-red-500 text-white rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default TodoList;
