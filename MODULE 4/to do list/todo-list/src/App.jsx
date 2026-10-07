import { useState } from "react";
import AddTodo from "./components/addtodo.jsx";
import TodoDashboard from "./components/tododashboard.jsx";
import "./App.css";

function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos((previousTodos) => [
      ...previousTodos,
      newTodo
    ]);
  };

  const deleteTodo = (id) => {
    setTodos((previousTodos) =>
      previousTodos.filter(
        (todo) => todo.id !== id
      )
    );
  };

  const completeTodo = (id) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed
            }
          : todo
      )
    );
  };

  return (
    <div className="app">

      <h1>Todo List</h1>

      <AddTodo addTodo={addTodo} />

      <TodoDashboard
        todos={todos}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
      />

    </div>
  );
}

export default App;