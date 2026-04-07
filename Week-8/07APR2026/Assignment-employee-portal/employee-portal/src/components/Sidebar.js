import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../styles/sidebar.css";

export default function Sidebar() {
  const { theme } = useTheme();
  const location = useLocation();

  return (
    <div className={`sidebar ${theme}`}>
      <div className="sidebar-header">
        <h2>Employee Portal</h2>
      </div>
      <nav className="sidebar-nav">
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "nav-link active" : "nav-link"}>
          📊 Dashboard
        </Link>
        <Link to="/analytics" className={location.pathname === "/analytics" ? "nav-link active" : "nav-link"}>
          📈 Analytics
        </Link>
        <Link to="/settings" className={location.pathname === "/settings" ? "nav-link active" : "nav-link"}>
          ⚙️ Settings
        </Link>
      </nav>
    </div>
  );
}
