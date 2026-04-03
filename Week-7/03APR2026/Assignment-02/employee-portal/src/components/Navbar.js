import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      <h2>Employee Portal</h2>

      {user && (
        <div style={styles.right}>
          <span>
            👤 {user.username} ({user.role})
          </span>

          <button style={styles.btn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  navbar: {
    height: "60px",
    background: "#1f2937",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px"
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  btn: {
    padding: "6px 12px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px"
  }
};

export default Navbar;