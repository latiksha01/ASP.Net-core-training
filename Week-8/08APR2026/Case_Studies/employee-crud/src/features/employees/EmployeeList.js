import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee } from "./employeeSlice";
import { updateEmployee } from "./employeeSlice";

function EmployeeList() {
    const employees = useSelector((state) => state.employee.employees);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Employee List</h2>
            {employees.map((employee) => (
                <div key={employee.id}>
                    <p>Name: {employee.name}</p>
                    <p>Position: {employee.position}</p>
                    <button onClick={() => dispatch(updateEmployee(employee))}>Update</button>
                    <button onClick={() => dispatch(deleteEmployee(employee.id))}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default EmployeeList;