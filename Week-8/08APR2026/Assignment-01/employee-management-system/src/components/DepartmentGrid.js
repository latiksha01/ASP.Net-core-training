import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllEmployees } from '../features/employees/employeeSlice';

const DEPT_CONFIG = {
  Engineering: { color: '#2563eb', bg: '#eff6ff',  icon: '⚙',  desc: 'Builds and maintains all products'     },
  Design:      { color: '#9333ea', bg: '#fdf4ff',  icon: '✦',  desc: 'Crafts user experience and interfaces' },
  Marketing:   { color: '#d97706', bg: '#fffbeb',  icon: '◈',  desc: 'Drives growth and brand awareness'     },
  Finance:     { color: '#16a34a', bg: '#f0fdf4',  icon: '◇',  desc: 'Manages budgets and financial health'  },
  HR:          { color: '#dc2626', bg: '#fef2f2',  icon: '♦',  desc: 'Recruits and supports the team'        },
  Operations:  { color: '#0891b2', bg: '#ecfeff',  icon: '▣',  desc: 'Keeps the company running smoothly'    },
};

function DeptCard({ name, data, config, maxCount }) {
  const fillPercent = Math.round((data.count / Math.max(maxCount, 1)) * 100);
  const activePercent = Math.round((data.active / Math.max(data.count, 1)) * 100);

  return (
    <div className="dept-card">
      {/* Icon */}
      <div
        className="dept-icon-wrap"
        style={{ background: config.bg, color: config.color }}
      >
        <span style={{ fontSize: '22px' }}>{config.icon}</span>
      </div>

      {/* Info */}
      <div className="dept-card-body">
        <div className="dept-name">{name}</div>
        <div className="dept-desc">{config.desc}</div>

        {/* Stats Row */}
        <div className="dept-stats-row">
          <div className="dept-stat">
            <span className="dept-stat-value" style={{ color: config.color }}>
              {data.count}
            </span>
            <span className="dept-stat-label">Total</span>
          </div>
          <div className="dept-stat">
            <span className="dept-stat-value" style={{ color: '#16a34a' }}>
              {data.active}
            </span>
            <span className="dept-stat-label">Active</span>
          </div>
          <div className="dept-stat">
            <span className="dept-stat-value" style={{ color: '#6b6b65' }}>
              {data.count - data.active}
            </span>
            <span className="dept-stat-label">Inactive</span>
          </div>
          <div className="dept-stat">
            <span className="dept-stat-value" style={{ color: '#d97706' }}>
              {activePercent}%
            </span>
            <span className="dept-stat-label">Active Rate</span>
          </div>
        </div>

        {/* Size bar (relative to largest dept) */}
        <div className="dept-bar-label">
          <span>Team size</span>
          <span>{fillPercent}% of largest dept</span>
        </div>
        <div className="dept-bar">
          <div
            className="dept-bar-fill"
            style={{ width: `${fillPercent}%`, background: config.color }}
          />
        </div>

        {/* Active rate bar */}
        <div className="dept-bar-label" style={{ marginTop: '8px' }}>
          <span>Active rate</span>
          <span>{activePercent}%</span>
        </div>
        <div className="dept-bar">
          <div
            className="dept-bar-fill"
            style={{ width: `${activePercent}%`, background: '#16a34a' }}
          />
        </div>
      </div>
    </div>
  );
}

export default function DepartmentGrid() {
  const employees = useSelector(selectAllEmployees);

  // Build dept stats from Redux store
  const deptMap = employees.reduce((acc, e) => {
    if (!acc[e.dept]) acc[e.dept] = { count: 0, active: 0, totalSalary: 0 };
    acc[e.dept].count++;
    if (e.status === 'Active') acc[e.dept].active++;
    acc[e.dept].totalSalary += e.salary || 0;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(deptMap).map((d) => d.count), 1);

  const totalEmployees = employees.length;
  const totalActive = employees.filter((e) => e.status === 'Active').length;
  const totalDepts = Object.keys(deptMap).length;

  return (
    <div>
      {/* Summary bar */}
      <div className="dept-summary-bar">
        <div className="dept-summary-item">
          <span className="dept-summary-value">{totalDepts}</span>
          <span className="dept-summary-label">Departments</span>
        </div>
        <div className="dept-summary-divider" />
        <div className="dept-summary-item">
          <span className="dept-summary-value">{totalEmployees}</span>
          <span className="dept-summary-label">Total Employees</span>
        </div>
        <div className="dept-summary-divider" />
        <div className="dept-summary-item">
          <span className="dept-summary-value" style={{ color: '#16a34a' }}>{totalActive}</span>
          <span className="dept-summary-label">Active Employees</span>
        </div>
        <div className="dept-summary-divider" />
        <div className="dept-summary-item">
          <span className="dept-summary-value" style={{ color: '#dc2626' }}>
            {totalEmployees - totalActive}
          </span>
          <span className="dept-summary-label">Inactive Employees</span>
        </div>
      </div>

      {/* Cards grid */}
      <div className="dept-grid">
        {Object.entries(deptMap).map(([name, data]) => {
          const config = DEPT_CONFIG[name] || {
            color: '#6b6b65', bg: '#f5f4f1', icon: '◈', desc: 'General department',
          };
          return (
            <DeptCard
              key={name}
              name={name}
              data={data}
              config={config}
              maxCount={maxCount}
            />
          );
        })}
      </div>
    </div>
  );
}