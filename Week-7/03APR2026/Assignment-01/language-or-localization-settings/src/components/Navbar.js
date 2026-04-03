import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import "./Navbar.css";

function Navbar() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="navbar">
      <h2 className="logo">🌐 LangApp</h2>

      <select
        className="dropdown"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">🇺🇸 English</option>
        <option value="hi">🇮🇳 Hindi</option>
        <option value="es">🇪🇸 Spanish</option>
        <option value="fr">🇫🇷 French</option>
      </select>
    </div>
  );
}

export default Navbar;