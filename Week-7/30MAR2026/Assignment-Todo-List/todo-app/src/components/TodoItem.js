import React from "react";

function TodoItem({ todo, deleteTask, toggleComplete }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />

      <span
        style={{
          marginLeft: "10px",
          textDecoration: todo.completed ? "line-through" : "none"
        }}
      >
        {todo.text}
      </span>

      <button
        onClick={() => deleteTask(todo.id)}
        style={{ marginLeft: "10px" }}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;