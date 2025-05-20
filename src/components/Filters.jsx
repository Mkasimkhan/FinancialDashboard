import React from 'react';

// Component to handle date range and department filters
const Filters = ({ filters, setFilters }) => {
  return (
    <div className="filters">
      {/* Start Date Picker */}
      <input
        type="date"
        value={filters.startDate}
        onChange={e => setFilters({ ...filters, startDate: e.target.value })}
      />

      {/* End Date Picker */}
      <input
        type="date"
        value={filters.endDate}
        onChange={e => setFilters({ ...filters, endDate: e.target.value })}
      />

      {/* Department Selector */}
      <select
        value={filters.department}
        onChange={e => setFilters({ ...filters, department: e.target.value })}
      >
        <option value="">All Departments</option>
        <option value="Sales">Sales</option>
        <option value="HR">HR</option>
        <option value="Tech">Tech</option>
      </select>
    </div>
  );
};

export default Filters;
