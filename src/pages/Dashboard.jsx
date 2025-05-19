import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RevenueLineChart from "../components/RevenueLineChart";
import ExpensesPieChart from "../components/ExpensesPieChart";
import ProfitBarChart from "../components/ProfitBarChart";
import FinancialTable from "../components/FinancialTable";
import Filters from "../components/Filters";
import DataForm from "../components/DataForm";
import { fetchMockData } from "../services/mockApi";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    department: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startOfYear = `${currentYear}-01-01`;
    const today = new Date().toISOString().split("T")[0];

    fetchMockData().then((fetchedData) => {
      setData(fetchedData);
      setFilters({ department: "", startDate: startOfYear, endDate: today });
    });
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container">
        <Filters filters={filters} setFilters={setFilters} />
        <DataForm data={data} setData={setData} />
        <div className="rowcont">
          <div className="row1">
            <RevenueLineChart revenue={data.revenue} filters={filters} />
          </div>
          <div className="row2">
            <ExpensesPieChart expenses={data.expenses} filters={filters} />
            <ProfitBarChart profits={data.profitMargins} filters={filters} />
          </div>
        </div>
        <FinancialTable data={data} filters={filters} />
      </div>
    </>
  );
};

export default Dashboard;
