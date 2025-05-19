
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueLineChart = ({ revenue, filters }) => {
  const filtered = revenue.filter((r) => {
    const monthDate = new Date(r.month);
    const start = filters.startDate ? new Date(filters.startDate) : null;
    const end = filters.endDate ? new Date(filters.endDate) : null;
    return (!start || monthDate >= start) && (!end || monthDate <= end);
  });

  return (
    <div className="chart-card">
      <h2>Revenue Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filtered}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickFormatter={(month) =>
              new Date(month).toLocaleDateString("default", {
                month: "short",
                year: "numeric",
              })
            }
          />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueLineChart;