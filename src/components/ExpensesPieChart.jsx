import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Array of colors for each pie slice
const COLORS = ["#0088FE", "#8884d8", "#00C49F", "#FFBB28", "#FF8042"];

const ExpensesPieChart = ({ expenses, filters }) => {
  // Return nothing if no expense data is available
  if (!expenses || expenses.length === 0) return null;

  // Filter expenses based on selected date range
  const filteredExpenses = expenses.filter((exp) => {
    const date = new Date(exp.date);
    const start = new Date(filters.startDate);
    const end = new Date(filters.endDate);
    return date >= start && date <= end;
  });

  // Group expenses by category and sum up the amounts
  const categorySums = filteredExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  // Prepare chart data with category name and total value
  const chartData = Object.entries(categorySums).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  // If no data after filtering, show message
  if (chartData.length === 0) return <p>No expense data in selected range.</p>;

  return (
    <div className="chart-card">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value" 
            nameKey="name"
            cx="50%"      
            cy="50%"       
            outerRadius={90} // Radius of the pie
            fill="#8884d8"
            label 
          >
            {/* Assign each slice a color from COLORS array */}
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />  
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesPieChart;
