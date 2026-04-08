import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllEmployees } from '../features/employees/employeeSlice';

const DEPT_COLORS = {
  Engineering: '#2563eb', Design: '#9333ea', Marketing: '#d97706',
  Finance: '#16a34a', HR: '#dc2626', Operations: '#0891b2',
};
const DEPT_ICONS = {
  Engineering: '⚙', Design: '✦', Marketing: '◈',
  Finance: '◇', HR: '♦', Operations: '▣',
};

export default function Departments() {
  const employees = useSelector(selectAllEmployees);
  const depts = employees.reduce((acc, e) => {
    if (!acc[e.dept]) acc[e.dept] = { count: 0, active: 0 };
    acc[e.dept].count++;
    if (e.status === 'Active') acc[e.dept].active++;
    return acc;
  }, {});
  const max = Math.max(...Object.values(depts).map(d => d.count), 1);

  return (
    <div className="page-inner">
      <div className="dept-grid">
        {Object.entries(depts).map(([name, data]) => (
          <div className="dept-card" key={name}>
            <div className="dept-icon" style={{ color: DEPT_COLORS[name] }}>
              {DEPT_ICONS[name] || '◈'}
            </div>
            <div className="dept-name">{name}</div>
            <div className="dept-count">{data.count} employees · {data.active} active</div>
            <div className="dept-bar">
              <div
                className="dept-bar-fill"
                style={{ width: `${Math.round(data.count / max * 100)}%`, background: DEPT_COLORS[name] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}