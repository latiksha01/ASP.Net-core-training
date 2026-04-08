import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllEmployees } from '../features/employees/employeeSlice';

export default function StatCards() {
  const employees = useSelector(selectAllEmployees);
  const active = employees.filter(e => e.status === 'Active').length;
  const depts = new Set(employees.map(e => e.dept)).size;
  const avgSalary = employees.length
    ? Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length)
    : 0;

  const stats = [
    { label: 'Total Employees', value: employees.length,                        change: 'Active workforce'                        },
    { label: 'Active',          value: active,                                  change: `${Math.round(active / Math.max(employees.length, 1) * 100)}% of total` },
    { label: 'Departments',     value: depts,                                   change: 'Cross-functional teams'                  },
    { label: 'Avg Salary',      value: `₹${(avgSalary / 100000).toFixed(1)}L`, change: 'Annual average'                          },
  ];

  return (
    <div className="stats-grid">
      {stats.map(s => (
        <div className="stat-card" key={s.label}>
          <div className="stat-label">{s.label}</div>
          <div className="stat-value">{s.value}</div>
          <div className="stat-change">{s.change}</div>
        </div>
      ))}
    </div>
  );
}