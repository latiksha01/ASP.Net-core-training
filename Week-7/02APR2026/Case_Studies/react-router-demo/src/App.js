import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter, NavLink } from "react-router-dom";

import About from "./About.js";
import Contact from "./Contact.js";
import Home from "./Home.js";

function App() {
  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        <NavLink to="/" style={styles.link} end>
        Home
        </NavLink>
        <NavLink to="/about" style={styles.link}>
        About
        </NavLink>
        <NavLink to="/contact" style={styles.link}>
        Contact
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>

      
  );
}

const styles = {
  nav: {
    display: "flex",
    gap : "0px",
    justifyContent: "space-around",
    padding: "10px",
    background: "#333",
  },
  link: ({ isActive }) => ({
    TextDecoration: "none",
    color: isActive ? "red" : "white",
    fontWeight: isActive ? "bold" : "normal",
  }),
}

export default App;