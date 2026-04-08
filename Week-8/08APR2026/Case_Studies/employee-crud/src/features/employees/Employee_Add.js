import React, { useState } from "react";
import { useDispatch } from "react-redux";          // ✅ NEW
import { addEmployee } from "./employeeSlice";      // ✅ NEW

function EmployeeAdd() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  const dispatch = useDispatch(); // ✅ NEW

  const handleSubmit = (e) => {
    e.preventDefault();

    // ❌ REMOVE this
    // console.log(name, position);

    // ✅ SEND DATA TO REDUX
    dispatch(addEmployee({ name, position }));

    setName("");
    setPosition("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default EmployeeAdd;