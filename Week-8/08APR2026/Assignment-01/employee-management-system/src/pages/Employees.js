import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilteredEmployees, selectFilter, selectAllEmployees,
  setFilter, addEmployee, editEmployee, deleteEmployee
} from '../features/employees/employeeSlice';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeModal from '../components/EmployeeModal';

export default function Employees() {
  const dispatch = useDispatch();
  const employees = useSelector(selectFilteredEmployees);
  const allEmployees = useSelector(selectAllEmployees);
  const currentFilter = useSelector(selectFilter);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);

  const depts = ['All', ...new Set(allEmployees.map(e => e.dept))];

  const handleAdd = () => { setEditingEmp(null); setModalOpen(true); };
  const handleEdit = (emp) => { setEditingEmp(emp); setModalOpen(true); };
  const handleDelete = (id) => {
    if (window.confirm('Delete this employee?')) dispatch(deleteEmployee(id));
  };
  const handleSave = (empData) => {
    if (editingEmp) {
      dispatch(editEmployee({ ...empData, id: editingEmp.id }));
    } else {
      dispatch(addEmployee({ ...empData, id: Date.now(), joinDate: new Date().toISOString().split('T')[0] }));
    }
    setModalOpen(false);
  };

  return (
    <div className="page-inner">
      <div className="filter-row">
        <div className="tag-filter">
          {depts.map(d => (
            <button
              key={d}
              className={`tag ${currentFilter === d ? 'active' : ''}`}
              onClick={() => dispatch(setFilter(d))}
            >{d}</button>
          ))}
        </div>
        <div className="emp-count">{employees.length} employees</div>
      </div>
      <div className="table-card">
        <div className="table-header">
          <span className="table-title">All Employees</span>
          <button className="btn btn-primary btn-sm" onClick={handleAdd}>+ Add Employee</button>
        </div>
        <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} showActions />
      </div>
      {modalOpen && (
        <EmployeeModal
          employee={editingEmp}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}