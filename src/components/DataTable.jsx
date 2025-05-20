import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Tabs, Tab } from "@mui/material";

// DataTable component displays revenue, expenses, and profit margins in a tabbed DataGrid
const DataTable = ({ data, filters }) => {
  const [tab, setTab] = React.useState(0); // Tab state to control active tab

  // Handle tab switching
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // Checks if a given date string falls within the filter date range
  const isWithinDateRange = (dateStr) => {
    if (!filters.startDate && !filters.endDate) return true;

    const date = new Date(dateStr);
    const start = filters.startDate ? new Date(filters.startDate) : null;
    const end = filters.endDate ? new Date(filters.endDate) : null;

    if (start && date < start) return false;
    if (end && date > end) return false;

    return true;
  };

  // Converts a date string to "Month Year" format (e.g., "Jan 2024")
  const formatToMonthYear = (dateStr) => {
    const options = { year: "numeric", month: "short" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", options); 
  };

  // Columns for the Revenue table
  const revenueColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "month",
      headerName: "Month",
      width: 150, 
      flex: 1,
      renderCell: (params) => formatToMonthYear(params.value),
    },
    {
      field: "amount",
      headerName: "Amount ($)",
      type: "number",
      width: 150,
      sortable: true,
      flex: 1
    },
  ];

  // Filter and map revenue data into DataGrid-compatible rows
  const revenueRows = data.revenue
    .filter((item) => isWithinDateRange(item.month)) 
    .map((item, index) => ({
      id: index + 1,
      month: item.month,
      amount: item.amount,
    }));

  // Columns for the Expenses table
  const expenseColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => formatToMonthYear(params.value),
      flex: 1
    },
    { field: "category", headerName: "Category", width: 150, flex: 1 },
    {
      field: "amount",
      headerName: "Amount ($)",
      type: "number",
      width: 150,
      sortable: true,
      flex: 1,
    },
  ];

  // Filter and map expense data into DataGrid-compatible rows
  const expenseRows = data.expenses
    .filter((item) => isWithinDateRange(item.date))
    .map((item, index) => ({
      id: index + 1,
      date: item.date,
      category: item.category,
      amount: item.amount,
    }));

  // Columns for the Profit Margin table
  const marginColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => formatToMonthYear(params.value),
      flex: 1,
    },
    { field: "department", headerName: "Department", width: 150, flex: 1 },
    {
      field: "margin",
      headerName: "Profit Margin (%)",
      type: "number",
      width: 180,
      sortable: true,
      flex: 1,
    },
  ];

  // Filter and map profit margin data into DataGrid-compatible rows
  const marginRows = data.profitMargins
    .filter((item) => {
      const matchesDept = filters.department
        ? item.department === filters.department
        : true;
      const matchesDate = isWithinDateRange(item.date);
      return matchesDept && matchesDate;
    })
    .map((item, index) => ({
      id: index + 1,
      date: item.date,
      department: item.department,
      margin: item.margin,
    }));

  return (
    <Box sx={{ width: "100%", mt: 10, height: 500, mb: 20 }}>
      {/* Title */}
      <Typography variant="h5" sx={{ mb: 2, color: '#8884d8' }}>
        Sortable & Filterable Data Table
      </Typography>

      {/* Tab navigation */}
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Revenue" />
        <Tab label="Expenses" />
        <Tab label="Profit Margins" />
      </Tabs>

      {/* Revenue Table */}
      {tab === 0 && (
        <DataGrid
          rows={revenueRows}
          columns={revenueColumns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          sx={{
            height: 500,
            boxShadow: 1,
            border: 1,
            borderColor: 'divider',
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#343a40',
              color: 'white'
            },
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
        />
      )}

      {/* Expenses Table */}
      {tab === 1 && (
        <DataGrid
          rows={expenseRows}
          columns={expenseColumns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          sx={{
            height: 500,
            boxShadow: 1,
            border: 1,
            borderColor: 'divider',
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#343a40',
              color: 'white'
            },
            '& .MuiDataGrid-scrollbarFiller--header': {
              backgroundColor: '#343a40',
            },
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
        />
      )}

      {/* Profit Margins Table */}
      {tab === 2 && (
        <DataGrid
          rows={marginRows}
          columns={marginColumns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          sx={{
            height: 500,
            overflow: 'auto',
            boxShadow: 1,
            border: 1,
            borderColor: 'divider',
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#343a40',
              color: 'white'
            },
            '& .MuiDataGrid-scrollbarFiller--header': {
              backgroundColor: '#343a40',
            },
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
        />
      )}
    </Box>
  );
};

export default DataTable;
