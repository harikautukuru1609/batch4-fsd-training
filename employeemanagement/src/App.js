import React, { useState } from "react";
import "./App.css";

import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/Employeelist";
import EmployeeProfileUpdate from "./components/Employeeprofileupdate";
import EmployeeSearch from "./components/Employeesearch";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Harika",
      email: "harika@gmail.com",
      department: "IT",
      salary: "30000",
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Add Employee
  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now(),
    };

    setEmployees([...employees, newEmployee]);
  };

  // Delete Employee
  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  // Update Employee
  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === updatedEmployee.id
          ? updatedEmployee
          : employee
      )
    );

    setSelectedEmployee(null);
  };

  // Search Employee
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Employee Management System</h1>

      <EmployeeSearch
        search={search}
        setSearch={setSearch}
      />

      <AddEmployee addEmployee={addEmployee} />

      {selectedEmployee && (
        <EmployeeProfileUpdate
          employee={selectedEmployee}
          updateEmployee={updateEmployee}
        />
      )}

      <EmployeeList
        employees={filteredEmployees}
        deleteEmployee={deleteEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />
    </div>
  );
}

export default App;