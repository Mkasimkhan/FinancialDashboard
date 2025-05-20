import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ProfitBarChart = ({ profits, filters }) => {
  // If no profit data is passed, render nothing
  if (!profits || profits.length === 0) return null;

  // Filter profit data based on the selected date range
  const filteredProfits = profits.filter(p => {
    const date = new Date(p.date);
    const start = new Date(filters.startDate);
    const end = new Date(filters.endDate);
    return date >= start && date <= end;
  });

  // Group profits by department and calculate average margin for each
  const grouped = {};
  filteredProfits.forEach(p => {
    if (!grouped[p.department]) grouped[p.department] = [];
    grouped[p.department].push(p.margin);
  });

  // Prepare data for chart: department name and average margin
  const chartData = Object.entries(grouped).map(([department, margins]) => ({
    department,
    avgMargin: margins.reduce((sum, m) => sum + m, 0) / margins.length,
  }));

  // If there's no data after filtering, show message
  if (chartData.length === 0) return <p>No profit data in selected range.</p>;

  return (
    <div className="chart-card">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" /> 
          <XAxis dataKey="department" /> {/* Department on X-axis */}
          <YAxis /> 
          <Tooltip />
          <Legend /> 
          <Bar dataKey="avgMargin" fill="#8884d8" /> 
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitBarChart;
