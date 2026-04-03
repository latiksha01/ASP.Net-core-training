import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Portal</h2>

      {user?.role === "admin" && (
        <button style={styles.link} onClick={() => navigate("/admin")}>
          Manage Employees
        </button>
      )}

      {user?.role === "employee" && (
        <button style={styles.link} onClick={() => navigate("/employee")}>
          My Profile
        </button>
      )}
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#111827",
    color: "white",
    padding: "20px"
  },
  logo: {
    marginBottom: "30px"
  },
  link: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    background: "#374151",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "6px"
  }
};

export default Sidebar;