import React, { useMemo, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, CircularProgress } from '@mui/material';

const FinancialTable = ({ data, filters }) => {
  const [loading, setLoading] = useState(true);

  // Simulate loading state with a timeout
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);

  // Memoized computation of rows to avoid recalculating unless data/filters change
  const rows = useMemo(() => {
    // If no data, return empty array
    if (!data || !data.profitMargins || data.profitMargins.length === 0) {
      return [];
    }

    // Step 1: Filter profit margins by selected date range
    const startDate = new Date(filters.startDate);
    const endDate = new Date(filters.endDate);
    const filteredMargins = data.profitMargins.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });

    // Step 2: Group margins by department
    const departmentMap = {};
    filteredMargins.forEach((item) => {
      if (!departmentMap[item.department]) {
        departmentMap[item.department] = [];
      }
      departmentMap[item.department].push(item.margin);
    });

    // Step 3: Calculate average margin for each department and prepare rows
    const result = [];
    let id = 1;
    for (let department in departmentMap) {
      const margins = departmentMap[department];
      const total = margins.reduce((sum, margin) => sum + margin, 0);
      const average = total / margins.length;
      result.push({
        id: id++, // unique ID required by DataGrid
        department: department,
        avgMargin: Number(average.toFixed(2)), // round to 2 decimal places
      });
    }

    return result;
  }, [data, filters]);

  // Columns definition for the DataGrid
  const columns = [
    { field: 'department', headerName: 'Department', width: 200, flex: 1 },
    {
      field: 'avgMargin',
      headerName: 'Avg Profit Margin (%)',
      type: 'number',
      width: 200,
      flex: 1,
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%', mt: 4 }}>
      {/* Title */}
      <Typography variant="h6" gutterBottom sx={{ color: '#8884d8' }}>
        Average Profit Margin Table
      </Typography>

      {/* Show loader while data is "loading" */}
      {loading ? (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        // Render DataGrid when loading is done
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableRowSelectionOnClick
          sx={{
            boxShadow: 1,
            border: 1,
            borderColor: 'divider',
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#343a40',
              color: 'white',
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

export default FinancialTable;
