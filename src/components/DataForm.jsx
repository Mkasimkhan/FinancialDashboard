import React, { useState } from "react";

// DataForm component to add or update revenue and expense data
const DataForm = ({ data, setData }) => {
  // State to toggle between 'revenue' or 'expense' form types
  const [type, setType] = useState("revenue");

  // State for revenue input fields, default month is current month
  const [revenue, setRevenue] = useState({
    month: new Date().toISOString().slice(0, 7), // format: YYYY-MM
    amount: ""
  });

  // State for expense input fields
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: ""
  });

  // Submit handler for the form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "revenue") {
      // Check if the revenue for the selected month already exists
      const existingIndex = data.revenue.findIndex(
        (item) => item.month === revenue.month
      );

      let updatedRevenue;
      if (existingIndex !== -1) {
        // If found, update the existing amount
        updatedRevenue = [...data.revenue];
        updatedRevenue[existingIndex].amount = Number(revenue.amount);
      } else {
        // If not found, add a new revenue entry
        updatedRevenue = [
          ...data.revenue,
          { ...revenue, amount: Number(revenue.amount) }
        ];
      }

      // Update the data with new revenue array
      setData((prev) => ({
        ...prev,
        revenue: updatedRevenue
      }));

      // Reset revenue form fields
      setRevenue({ month: new Date().toISOString().slice(0, 7), amount: "" });
    }

    if (type === "expense") {
      // Check if the expense for the same category and date exists
      const existingIndex = data.expenses.findIndex(
        (item) =>
          item.category === expense.category && item.date === expense.date
      );

      let updatedExpenses;
      if (existingIndex !== -1) {
        // If found, update the existing amount
        updatedExpenses = [...data.expenses];
        updatedExpenses[existingIndex].amount = Number(expense.amount);
      } else {
        // If not found, add a new expense entry
        updatedExpenses = [
          ...data.expenses,
          { ...expense, amount: Number(expense.amount) }
        ];
      }

      // Update the data with new expenses array
      setData((prev) => ({
        ...prev,
        expenses: updatedExpenses
      }));

      // Reset expense form fields
      setExpense({ category: "", amount: "", date: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add or Update Data</h2>

      {/* Dropdown to select between Revenue and Expense */}
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="revenue">Revenue</option>
        <option value="expense">Expense</option>
      </select>

      {/* Revenue input form */}
      {type === "revenue" && (
        <>
          <input
            type="month"
            value={revenue.month}
            onChange={(e) =>
              setRevenue({ ...revenue, month: e.target.value })
            }
            required
          />
          <input
            placeholder="Amount"
            type="number"
            value={revenue.amount}
            onChange={(e) => setRevenue({ ...revenue, amount: e.target.value })}
            required
          />
        </>
      )}

      {/* Expense input form */}
      {type === "expense" && (
        <>
          <input
            placeholder="Category"
            value={expense.category}
            onChange={(e) =>
              setExpense({ ...expense, category: e.target.value })
            }
            required
          />
          <input
            type="date"
            value={expense.date}
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            required
          />
          <input
            placeholder="Amount"
            type="number"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            required
          />
        </>
      )}

      {/* Submit button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DataForm;
