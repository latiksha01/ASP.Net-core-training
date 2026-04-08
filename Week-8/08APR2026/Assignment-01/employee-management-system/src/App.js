import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './features/auth/authSlice';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import ReduxConcepts from './pages/ReduxConcepts';
import ActionLogs from './pages/ActionLogs';

export default function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [activePage, setActivePage] = useState('dashboard');

  if (!isLoggedIn) return <Login />;

  const pages = {
    dashboard: <Dashboard onNavigate={setActivePage} />,
    employees: <Employees />,
    departments: <Departments />,
    redux: <ReduxConcepts />,
    logs: <ActionLogs />,
  };

  return (
    <div className="app">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="main">
        <Topbar activePage={activePage} />
        <div className="page-content">{pages[activePage]}</div>
      </div>
    </div>
  );
}