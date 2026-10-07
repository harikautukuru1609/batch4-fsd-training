import { useState } from "react";
import AddTask from "./AddTask";

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskName) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
  };

  return (
    <div className="dashboard">

      <h1>Task Manager</h1>

      <p className="subtitle">
        Manage your daily tasks easily
      </p>

      <AddTask addTask={addTask} />

      <div className="task-info">

        <p>
          Total Tasks:
          <strong> {tasks.length}</strong>
        </p>

        <p>
          Completed:
          <strong>
            {" "}
            {tasks.filter(
              (task) => task.completed
            ).length}
          </strong>
        </p>

        <p>
          Pending:
          <strong>
            {" "}
            {tasks.filter(
              (task) => !task.completed
            ).length}
          </strong>
        </p>

      </div>

      <div className="task-list">

        {tasks.length === 0 ? (
          <p className="no-task">
            No tasks added yet.
          </p>
        ) : (
          tasks.map((task) => (
            <div
              className={`task ${
                task.completed ? "completed" : ""
              }`}
              key={task.id}
            >

              <div className="task-left">

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    completeTask(task.id)
                  }
                />

                <span>
                  {task.name}
                </span>

              </div>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteTask(task.id)
                }
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default TaskDashboard;