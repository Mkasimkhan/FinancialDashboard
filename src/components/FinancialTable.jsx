// import React, { useState } from 'react';

// const FinancialTable = ({ data, filters }) => {
//   const [sortKey, setSortKey] = useState('');
//   const [asc, setAsc] = useState(true);

//   const toggleSort = (key) => {
//     setSortKey(key);
//     setAsc(prev => key === sortKey ? !prev : true);
//   };

//   // Filter by date
//   const filtered = data.profitMargins.filter(p => {
//     const date = new Date(p.date);
//     const start = new Date(filters.startDate);
//     const end = new Date(filters.endDate);
//     return date >= start && date <= end;
//   });

//   // Group and calculate average margin per department
//   const grouped = {};
//   filtered.forEach(p => {
//     if (!grouped[p.department]) grouped[p.department] = [];
//     grouped[p.department].push(p.margin);
//   });

//   const aggregated = Object.entries(grouped).map(([department, margins]) => ({
//     department,
//     avgMargin: margins.reduce((sum, m) => sum + m, 0) / margins.length,
//   }));

//   const sorted = [...aggregated].sort((a, b) => {
//     if (!sortKey) return 0;
//     return asc
//       ? a[sortKey] > b[sortKey] ? 1 : -1
//       : a[sortKey] < b[sortKey] ? 1 : -1;
//   });

//   return (
//     <div className="table-section">
//       <h2>Average Profit Margin Table</h2>
//       <table>
//         <thead>
//           <tr>
//             <th onClick={() => toggleSort('department')}>Department</th>
//             <th onClick={() => toggleSort('avgMargin')}>Avg Profit Margin</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sorted.map((row, idx) => (
//             <tr key={idx}>
//               <td>{row.department}</td>
//               <td>{row.avgMargin.toFixed(2)}%</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FinancialTable;


// src/components/FinancialTable.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, CircularProgress } from '@mui/material';

const FinancialTable = ({ data, filters }) => {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const rows = useMemo(() => {
    if (!data || !data.profitMargins || data.profitMargins.length === 0) {
      return [];
    }
  
    // Step 1: Filter profit margins by date
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
  
    // Step 3: Create rows with average margin
    const result = [];
    let id = 1;
    for (let department in departmentMap) {
      const margins = departmentMap[department];
      const total = margins.reduce((sum, margin) => sum + margin, 0);
      const average = total / margins.length;
      result.push({
        id: id++,
        department: department,
        avgMargin: Number(average.toFixed(2)),
      });
    }
  
    return result;
  }, [data, filters]);
  

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
      <Typography variant="h6" gutterBottom>
        Average Profit Margin Table
      </Typography>
      {loading ? (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
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

export default FinancialTable;
