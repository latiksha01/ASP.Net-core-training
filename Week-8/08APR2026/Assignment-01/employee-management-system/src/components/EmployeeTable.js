import React from 'react';

const DEPT_COLORS = {
  Engineering: '#2563eb', Design: '#9333ea', Marketing: '#d97706',
  Finance: '#16a34a', HR: '#dc2626', Operations: '#0891b2',
};

export default function EmployeeTable({ employees, onEdit, onDelete, showActions }) {
  if (!employees.length)
    return <div className="empty-state">No employees found.</div>;

  return (
    <table className="emp-table">
      <thead>
        <tr>
          <th>Employee</th><th>Department</th><th>Role</th>
          <th>Location</th><th>Salary</th><th>Status</th>
          {showActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {employees.map(e => (
          <tr key={e.id}>
            <td>
              <div className="emp-name-cell">
                <div className="avatar" style={{ background: DEPT_COLORS[e.dept] || '#888' }}>
                  {e.fname[0]}{e.lname[0]}
                </div>
                <div>
                  <div className="emp-name">{e.fname} {e.lname}</div>
                  <div className="emp-email">{e.email}</div>
                </div>
              </div>
            </td>
            <td><span className="badge badge-dept">{e.dept}</span></td>
            <td>{e.role}</td>
            <td>{e.location}</td>
            <td>₹{(e.salary / 100000).toFixed(1)}L</td>
            <td>
              <span className={`badge ${e.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                {e.status}
              </span>
            </td>
            {showActions && (
              <td>
                <button className="btn btn-secondary btn-sm" onClick={() => onEdit(e)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(e.id)}>Delete</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}