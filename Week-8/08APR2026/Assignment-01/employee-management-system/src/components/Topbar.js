import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../features/employees/employeeSlice';

const PAGE_TITLES = {
  dashboard:   ['Dashboard',       'Overview › Home'],
  employees:   ['Employees',       'Management › All Employees'],
  departments: ['Departments',     'Overview › By Department'],
  redux:       ['Redux Concepts',  'Learning › Core Concepts'],
  logs:        ['Action Logs',     'Dev Tools › Redux Logger'],
};

export default function Topbar({ activePage }) {
  const dispatch = useDispatch();
  const [title, breadcrumb] = PAGE_TITLES[activePage] || ['Page', ''];

  return (
    <div className="topbar">
      <div>
        <div className="page-title">{title}</div>
        <div className="page-breadcrumb">{breadcrumb}</div>
      </div>
      <div className="topbar-actions">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search employees..."
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}