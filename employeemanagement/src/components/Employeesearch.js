import React from "react";

function EmployeeSearch({ search, setSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search employee by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default EmployeeSearch;