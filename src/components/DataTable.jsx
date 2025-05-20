import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Tabs, Tab } from "@mui/material";

const DataTable = ({ data, filters }) => {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // Filter helper for dates
  const isWithinDateRange = (dateStr) => {
    if (!filters.startDate && !filters.endDate) return true;

    const date = new Date(dateStr);
    const start = filters.startDate ? new Date(filters.startDate) : null;
    const end = filters.endDate ? new Date(filters.endDate) : null;

    if (start && date < start) return false;
    if (end && date > end) return false;

    return true;
  };

  const formatToMonthYear = (dateStr) => {
    const options = { year: "numeric", month: "short" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", options); // e.g., Jan 2025
  };

  // Revenue: filtering based on month (if it maps to date, otherwise skip)
  const revenueColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "month",
      headerName: "Month",
      width: 150, 
      flex: 1,
      renderCell: (params) => {
        return formatToMonthYear(params.value);
      },
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

  const revenueRows = data.revenue
    .filter((item) => isWithinDateRange(item.month)) // assumes month is a date string
    .map((item, index) => ({
      id: index + 1,
      month: item.month,
      amount: item.amount,
    }));

  // Expenses: filter by date range
  const expenseColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => {
        return formatToMonthYear(params.value);
      },
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

  const expenseRows = data.expenses
    .filter((item) => isWithinDateRange(item.date))
    .map((item, index) => ({
      id: index + 1,
      date: item.date,
      category: item.category,
      amount: item.amount,
    }));

  // Profit Margins: filter by date and department
  const marginColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => {
        return formatToMonthYear(params.value);
      },
      flex: 1,
    },
    { field: "department", headerName: "Department", width: 150, flex: 1,},
    {
      field: "margin",
      headerName: "Profit Margin (%)",
      type: "number",
      width: 180,
      sortable: true,
      flex: 1,
    },
  ];

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
    <Box sx={{ width: "100%", mt: 10 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sortable & Filterable Data Table
      </Typography>

      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Revenue" />
        <Tab label="Expenses" />
        <Tab label="Profit Margins" />
      </Tabs>

      {tab === 0 && (
        <DataGrid
          rows={revenueRows}
          columns={revenueColumns}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          sx={{
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

      {tab === 1 && (
        <DataGrid
          rows={expenseRows}
          columns={expenseColumns}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          sx={{
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

      {tab === 2 && (
        <DataGrid
          rows={marginRows}
          columns={marginColumns}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          sx={{
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
    </Box>
  );
};

export default DataTable;
