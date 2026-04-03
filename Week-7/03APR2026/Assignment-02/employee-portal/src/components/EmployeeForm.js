import React, { useState, useEffect } from "react";

const EmployeeForm = ({ addEmployee, updateEmployee, editingEmployee, setEditingEmployee }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: ""
  });

  const [error, setError] = useState("");

  // Fill data when editing
  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.role) {
      setError("All fields are required ❗");
      return;
    }

    if (editingEmployee) {
      updateEmployee(formData);
      setEditingEmployee(null);
    } else {
      addEmployee(formData);
    }

    setFormData({ name: "", role: "" });
    setError("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>{editingEmployee ? "Edit Employee" : "Add Employee"}</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="role"
        placeholder="Enter Role"
        value={formData.role}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        {editingEmployee ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default EmployeeForm;
