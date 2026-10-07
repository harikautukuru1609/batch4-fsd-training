function TodoDashboard({ todos, deleteTodo, completeTodo }) {
  return (
    <div className="dashboard">

      <h2>My To-Do List</h2>

      {todos.length === 0 ? (
        <p className="empty">
          No tasks added yet.
        </p>
      ) : (
        <div className="todo-list">

          {todos.map((todo) => (
            <div className="todo-item" key={todo.id}>

              <span
                className={todo.completed ? "completed" : ""}
                onClick={() => completeTodo(todo.id)}
              >
                {todo.title}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default TodoDashboard;