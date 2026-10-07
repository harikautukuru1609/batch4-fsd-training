import { useState } from "react";

function AddTodo({ addTodo }) {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.trim() === "") {
      alert("Please enter a task");
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: todo,
      completed: false,
    };

    addTodo(newTodo);
    setTodo("");
  };

  return (
    <div className="add-todo">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />

        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default AddTodo;