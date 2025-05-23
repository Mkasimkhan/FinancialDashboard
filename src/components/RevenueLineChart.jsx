import { React, memo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// React.memo to prevent unnecessary re-renders if props don't change
const RevenueLineChart = memo(({ revenue, filters }) => {
  // Filter revenue data by date range from filters
  const filtered = revenue.filter((r) => {
    const monthDate = new Date(r.month);
    const start = filters.startDate ? new Date(filters.startDate) : null;
    const end = filters.endDate ? new Date(filters.endDate) : null;
    // Include only data points within the date range if set
    return (!start || monthDate >= start) && (!end || monthDate <= end);
  });

  return (
    <div className="chart-card">
      {/* Chart title */}
      <h2>Revenue Over Time</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filtered}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-axis with formatted dates */}
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
          {/* Tooltip on hover to show data details */}
          <Tooltip />

          {/* Line representing revenue over time */}
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default RevenueLineChart;
