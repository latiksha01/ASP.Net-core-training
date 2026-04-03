import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <Sidebar />
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex"
  },
  content: {
    flex: 1,
    padding: "20px",
    background: "#f3f4f6",
    minHeight: "100vh"
  }
};

export default Layout;