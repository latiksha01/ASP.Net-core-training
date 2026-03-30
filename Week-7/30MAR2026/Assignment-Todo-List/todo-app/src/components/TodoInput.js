import React, { useState } from "react";

function TodoInput({ addTask }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    addTask(task);
    setTask("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ padding: "10px", width: "200px" }}
      />
      <button onClick={handleAdd} style={{ marginLeft: "10px" }}>
        Add
      </button>
    </div>
  );
}

export default TodoInput;