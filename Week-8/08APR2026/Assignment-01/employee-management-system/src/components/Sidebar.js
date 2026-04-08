import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { selectUser } from '../features/auth/authSlice';

const NAV_ITEMS = [
  { id: 'dashboard',   label: 'Dashboard',      group: 'Main'  },
  { id: 'employees',   label: 'Employees',      group: 'Main'  },
  { id: 'departments', label: 'Departments',    group: 'Main'  },
  { id: 'redux',       label: 'Redux Concepts', group: 'Redux' },
  { id: 'logs',        label: 'Action Logs',    group: 'Redux' },
];

export default function Sidebar({ activePage, onNavigate }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const initials = user?.name?.slice(0, 2).toUpperCase() || 'AD';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-text">EMS Dashboard</div>
        <div className="logo-sub">Redux State Management</div>
      </div>
      <nav className="sidebar-nav">
        {['Main', 'Redux'].map(group => (
          <div key={group}>
            <div className="nav-label">{group}</div>
            {NAV_ITEMS.filter(n => n.group === group).map(item => (
              <div
                key={item.id}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="avatar-sm">{initials}</div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'Admin User'}</div>
            <div className="user-role">{user?.role || 'Administrator'}</div>
          </div>
        </div>
        <button
          className="btn btn-secondary"
          style={{ width: '100%', marginTop: '8px', fontSize: '12px' }}
          onClick={() => dispatch(logout())}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}