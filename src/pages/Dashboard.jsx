import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RevenueLineChart from "../components/RevenueLineChart";
import ExpensesPieChart from "../components/ExpensesPieChart";
import ProfitBarChart from "../components/ProfitBarChart";
import FinancialTable from "../components/FinancialTable";
import Filters from "../components/Filters";
import DataForm from "../components/DataForm";
import { fetchMockData } from "../services/mockApi";
import DataTable from "../components/DataTable";

const Dashboard = () => {
  // State to hold the fetched financial data
  const [data, setData] = useState(null);

  // State to hold filters: department and date range
  const [filters, setFilters] = useState({
    department: "",
    startDate: "",
    endDate: "",
  });

  // Log data whenever it updates (for debugging)
  useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);

  // On component mount, fetch mock data and set initial filters
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startOfYear = `${currentYear}-01-01`;
    const today = new Date().toISOString().split("T")[0]; // today's date in YYYY-MM-DD

    fetchMockData().then((fetchedData) => {
      setData(fetchedData);
      setFilters({ department: "", startDate: startOfYear, endDate: today });
    });
  }, []);

  // Show nothing while data is loading
  if (!data) return null;

  return (
    <>
      {/* Top navigation bar */}
      <Navbar />

      {/* Main container for dashboard content */}
      <div className="container">
        {/* Filters component for setting department and date range */}
        <Filters filters={filters} setFilters={setFilters} />

        {/* Form for adding or editing data */}
        <DataForm data={data} setData={setData} />

        {/* Row container holding charts */}
        <div className="rowcont">
          {/* Row 1: Revenue line chart */}
          <div className="row1">
            <RevenueLineChart revenue={data.revenue} filters={filters} />
          </div>

          {/* Row 2: Expenses pie chart and Profit bar chart side by side */}
          <div className="row2">
            <ExpensesPieChart expenses={data.expenses} filters={filters} />
            <ProfitBarChart profits={data.profitMargins} filters={filters} />
          </div>
        </div>

        {/* Financial summary table */}
        <FinancialTable data={data} filters={filters} />

        {/* Additional data table */}
        <DataTable data={data} filters={filters} />
      </div>
    </>
  );
};

export default Dashboard;
