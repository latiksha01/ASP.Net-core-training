import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllEmployees } from '../features/employees/employeeSlice';
import StatCards from '../components/StatCards';
import EmployeeTable from '../components/EmployeeTable';

export default function Dashboard({ onNavigate }) {
  const employees = useSelector(selectAllEmployees);
  const recent = [...employees].slice(-5).reverse();

  return (
    <div className="page-inner">
      <div className="redux-banner">
        <div>
          <h3>Redux State Management — Active</h3>
          <p>All state flows through the Redux store. Store → Reducer → Action → UI</p>
        </div>
        <div className="banner-pills">
          {['Store', 'Reducers', 'Actions', 'Middleware', 'createSlice', 'Immer'].map(p => (
            <span key={p} className="banner-pill">{p}</span>
          ))}
        </div>
      </div>
      <StatCards />
      <div className="table-card">
        <div className="table-header">
          <span className="table-title">Recent Employees</span>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('employees')}>
            View all
          </button>
        </div>
        <EmployeeTable employees={recent} showActions={false} />
      </div>
    </div>
  );
}