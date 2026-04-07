import Sidebar from "../components/Sidebar";
import { useEmployees } from "../context/EmployeeContext";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { employees, addEmployee, deleteEmployee } = useEmployees();

  return (
    <div className="layout">
      <Sidebar />

      <div className="dashboard">
        <h2>Dashboard</h2>

        <div className="cards">
          <div className="card">💰 Revenue ₹45,000</div>
          <div className="card">👥 Employees {employees.length}</div>
          <div className="card">📋 Tasks 120</div>
        </div>

        <button onClick={addEmployee}>➕ Add Employee</button>

        <div className="employee-list">
          {employees.map((emp) => (
            <div key={emp.id}>
              <span>👤 {emp.name} - {emp.role}</span>
              <button className="delete-btn" onClick={() => deleteEmployee(emp.id)}>
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
