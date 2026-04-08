import React, { useState } from 'react';

const DEPTS = ['Engineering', 'Design', 'Marketing', 'Finance', 'HR', 'Operations'];

export default function EmployeeModal({ employee, onSave, onClose }) {
  const [form, setForm] = useState({
    fname: employee?.fname || '',
    lname: employee?.lname || '',
    email: employee?.email || '',
    dept: employee?.dept || 'Engineering',
    role: employee?.role || '',
    salary: employee?.salary || '',
    location: employee?.location || '',
    status: employee?.status || 'Active',
  });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSave = () => {
    if (!form.fname || !form.lname || !form.email || !form.role) {
      alert('Please fill all required fields');
      return;
    }
    onSave({ ...form, salary: parseInt(form.salary) || 0 });
  };

  return (
    <div className="modal-overlay open">
      <div className="modal">
        <div className="modal-title">{employee ? 'Edit Employee' : 'Add Employee'}</div>
        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" value={form.fname} onChange={set('fname')} placeholder="e.g. Priya" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" value={form.lname} onChange={set('lname')} placeholder="e.g. Sharma" />
          </div>
          <div className="form-group full">
            <label>Email</label>
            <input type="email" value={form.email} onChange={set('email')} placeholder="priya@company.com" />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select value={form.dept} onChange={set('dept')}>
              {DEPTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Role</label>
            <input type="text" value={form.role} onChange={set('role')} placeholder="e.g. Senior Developer" />
          </div>
          <div className="form-group">
            <label>Salary (₹)</label>
            <input type="number" value={form.salary} onChange={set('salary')} placeholder="1200000" />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" value={form.location} onChange={set('location')} placeholder="e.g. Bangalore" />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={form.status} onChange={set('status')}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>
            {employee ? 'Save Changes' : 'Add Employee'}
          </button>
        </div>
      </div>
    </div>
  );
}