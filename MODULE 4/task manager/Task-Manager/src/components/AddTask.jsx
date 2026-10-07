import { useState } from "react";

function AddTask({ addTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }

    addTask(task);
    setTask("");
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Enter your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button type="submit">
        Add Task
      </button>

    </form>
  );
}

export default AddTask;