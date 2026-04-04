import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import BillEditor from './pages/BillEditor';
import PastBills from './pages/PastBills';
import CatalogManager from './pages/CatalogManager';
import SalesDashboard from './pages/SalesDashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <span className="navbar-brand">🧾 BillGen Pro</span>
          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>New Bill</NavLink>
            <NavLink to="/past" className={({ isActive }) => isActive ? 'active' : ''}>Past Bills</NavLink>
            <NavLink to="/catalogs" className={({ isActive }) => isActive ? 'active' : ''}>Catalogs</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<BillEditor />} />
            <Route path="/past" element={<PastBills />} />
            <Route path="/catalogs" element={<CatalogManager />} />
            <Route path="/dashboard" element={<SalesDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;