import React, { useState } from 'react';

const FinancialTable = ({ data, filters }) => {
  const [sortKey, setSortKey] = useState('');
  const [asc, setAsc] = useState(true);

  const toggleSort = (key) => {
    setSortKey(key);
    setAsc(prev => key === sortKey ? !prev : true);
  };

  // Filter by date
  const filtered = data.profitMargins.filter(p => {
    const date = new Date(p.date);
    const start = new Date(filters.startDate);
    const end = new Date(filters.endDate);
    return date >= start && date <= end;
  });

  // Group and calculate average margin per department
  const grouped = {};
  filtered.forEach(p => {
    if (!grouped[p.department]) grouped[p.department] = [];
    grouped[p.department].push(p.margin);
  });

  const aggregated = Object.entries(grouped).map(([department, margins]) => ({
    department,
    avgMargin: margins.reduce((sum, m) => sum + m, 0) / margins.length,
  }));

  const sorted = [...aggregated].sort((a, b) => {
    if (!sortKey) return 0;
    return asc
      ? a[sortKey] > b[sortKey] ? 1 : -1
      : a[sortKey] < b[sortKey] ? 1 : -1;
  });

  return (
    <div className="table-section">
      <h2>Average Profit Margin Table</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => toggleSort('department')}>Department</th>
            <th onClick={() => toggleSort('avgMargin')}>Avg Profit Margin</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, idx) => (
            <tr key={idx}>
              <td>{row.department}</td>
              <td>{row.avgMargin.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialTable;
