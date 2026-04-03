import React, { useContext, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import EmployeeForm from "../components/EmployeeForm";

const AdminDashboard = () => {
  const { employees, addEmployee, deleteEmployee, updateEmployee } =
    useContext(EmployeeContext);

  const [editingEmployee, setEditingEmployee] = useState(null);

  return (
    <div>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>Admin Dashboard</h2>
        <p>Manage your employees efficiently</p>
      </div>

      {/* STATS */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3>{employees.length}</h3>
          <p>Total Employees</p>
        </div>

        <div style={styles.statCard}>
          <h3>Active</h3>
          <p>Status</p>
        </div>

        <div style={styles.statCard}>
          <h3>Admin</h3>
          <p>Role Access</p>
        </div>
      </div>

      {/* FORM */}
      <div style={styles.formCard}>
        <EmployeeForm
          addEmployee={addEmployee}
          updateEmployee={updateEmployee}
          editingEmployee={editingEmployee}
          setEditingEmployee={setEditingEmployee}
        />
      </div>

      {/* EMPLOYEE LIST */}
      <h3 style={{ marginTop: "20px" }}>Employee List</h3>

      <div style={styles.grid}>
        {employees.map((emp) => (
          <div key={emp.id} style={styles.card}>
            <h4>{emp.name}</h4>
            <p>{emp.role}</p>

            <div style={styles.btnGroup}>
              <button
                style={styles.editBtn}
                onClick={() => setEditingEmployee(emp)}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteEmployee(emp.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  header: {
    marginBottom: "20px"
  },
  statsContainer: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px"
  },
  statCard: {
    flex: 1,
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  formCard: {
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px"
  },
  card: {
    padding: "15px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  btnGroup: {
    marginTop: "10px",
    display: "flex",
    gap: "10px"
  },
  editBtn: {
    flex: 1,
    padding: "6px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  deleteBtn: {
    flex: 1,
    padding: "6px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default AdminDashboard;