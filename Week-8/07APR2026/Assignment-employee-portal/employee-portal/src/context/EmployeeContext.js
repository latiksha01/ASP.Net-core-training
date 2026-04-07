import { createContext, useContext, useState } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Rahul", role: "Developer" },
    { id: 2, name: "Sneha", role: "Designer" },
  ]);

  const addEmployee = () => {
    const newEmp = {
      id: Date.now(),
      name: "New Employee",
      role: "Intern",
    };
    setEmployees([...employees, newEmp]);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);