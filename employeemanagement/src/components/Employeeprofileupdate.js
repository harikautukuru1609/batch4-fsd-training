import React, { useState } from "react";

function EmployeeProfileUpdate({
  employee,
  updateEmployee,
}) {
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [department, setDepartment] = useState(
    employee.department
  );
  const [salary, setSalary] = useState(employee.salary);

  const handleUpdate = (e) => {
    e.preventDefault();

    updateEmployee({
      id: employee.id,
      name,
      email,
      department,
      salary,
    });

    alert("Employee updated successfully!");
  };

  return (
    <div className="form-container">
      <h2>Update Employee</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Employee Name"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department"
        />

        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Salary"
        />

        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default EmployeeProfileUpdate;