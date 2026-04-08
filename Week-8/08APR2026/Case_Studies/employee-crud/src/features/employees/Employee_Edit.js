import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateEmployee } from "./employeeSlice";

function EmployeeEdit({ selectedEmployee, clearEdit }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedEmployee) {
      setName(selectedEmployee.name);
      setPosition(selectedEmployee.position);
    }
  }, [selectedEmployee]);

  const handleUpdate = () => {
    dispatch(
      updateEmployee({
        id: selectedEmployee.id,  // ✅ important
        name,
        position,
      })
    );

    clearEdit(); // close edit form
  };

  return (
    <div>
      <h3>Edit Employee</h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <button onClick={handleUpdate}>Update</button>
      <button onClick={clearEdit}>Cancel</button>
    </div>
  );
}

export default EmployeeEdit;