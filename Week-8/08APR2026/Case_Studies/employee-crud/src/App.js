import React, { useState } from "react";

// ✅ FIXED: Proper casing (PascalCase)
import EmployeeList from "./features/employees/EmployeeList";
import EmployeeAdd from "./features/employees/Employee_Add";
import EmployeeEdit from "./features/employees/Employee_Edit";

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div>
      <h1>Employee Management</h1>

      <EmployeeAdd />

      <EmployeeList onEdit={(emp) => setSelectedEmployee(emp)} />

      {selectedEmployee && (
        <EmployeeEdit
          selectedEmployee={selectedEmployee}
          clearEdit={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}

export default App;