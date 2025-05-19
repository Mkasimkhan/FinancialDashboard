import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProfitBarChart = ({ profits, filters }) => {
  if (!profits || profits.length === 0) return null;

  // Filter by date
  const filteredProfits = profits.filter(p => {
    const date = new Date(p.date);
    const start = new Date(filters.startDate);
    const end = new Date(filters.endDate);
    return date >= start && date <= end;
  });

  // Group by department and average margin
  const grouped = {};
  filteredProfits.forEach(p => {
    if (!grouped[p.department]) grouped[p.department] = [];
    grouped[p.department].push(p.margin);
  });

  const chartData = Object.entries(grouped).map(([department, margins]) => ({
    department,
    avgMargin: margins.reduce((sum, m) => sum + m, 0) / margins.length,
  }));

  if (chartData.length === 0) return <p>No profit data in selected range.</p>;

  return (
    <div className="chart-card">
      <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="department" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="avgMargin" fill="#82ca9d" />
    </BarChart>
    </ResponsiveContainer>
    </div>
    
  );
};

export default ProfitBarChart;
