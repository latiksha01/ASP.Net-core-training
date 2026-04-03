import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { EmployeeContext } from "../context/EmployeeContext";

const EmployeeDashboard = () => {
  const { user } = useContext(AuthContext);
  const { employees } = useContext(EmployeeContext);

  const myData = employees.find(
    (emp) => emp.name.toLowerCase() === user.username.toLowerCase()
  );

  return (
    <div>
      <h2>My Profile</h2>

      {myData ? (
        <div style={styles.card}>
          <h3>{myData.name}</h3>
          <p><strong>Role:</strong> {myData.role}</p>
          <p><strong>Status:</strong> Active</p>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
};

const styles = {
  card: {
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  }
};

export default EmployeeDashboard;
