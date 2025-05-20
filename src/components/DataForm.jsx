import React, { useState } from 'react';

const DataForm = ({ data, setData }) => {
  const [type, setType] = useState('revenue'); // 'revenue' or 'expense'
  const [revenue, setRevenue] = useState({ month: '', amount: '' });
  const [expense, setExpense] = useState({ category: '', amount: '', date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'revenue') {
      const existingIndex = data.revenue.findIndex(item => item.month === revenue.month);

      let updatedRevenue;
      if (existingIndex !== -1) {
        // Update existing revenue
        updatedRevenue = [...data.revenue];
        updatedRevenue[existingIndex].amount = Number(revenue.amount);
      } else {
        // Add new revenue entry
        updatedRevenue = [...data.revenue, { ...revenue, amount: Number(revenue.amount) }];
      }

      setData(prev => ({
        ...prev,
        revenue: updatedRevenue
      }));
    }

    if (type === 'expense') {
      const existingIndex = data.expenses.findIndex(
        item => item.category === expense.category && item.date === expense.date
      );

      let updatedExpenses;
      if (existingIndex !== -1) {
        // Update existing expense
        updatedExpenses = [...data.expenses];
        updatedExpenses[existingIndex].amount = Number(expense.amount);
      } else {
        // Add new expense
        updatedExpenses = [...data.expenses, { ...expense, amount: Number(expense.amount) }];
      }

      setData(prev => ({
        ...prev,
        expenses: updatedExpenses
      }));
    }

    // Reset fields
    setRevenue({ month: '', amount: '' });
    setExpense({ category: '', amount: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add or Update Data</h2>

      <select value={type} onChange={e => setType(e.target.value)} required>
        <option value="revenue">Revenue</option>
        <option value="expense">Expense</option>
      </select>

      {type === 'revenue' && (
        <>
          <input
            type="month"
            value={revenue.month.slice(0, 7)}
            onChange={e => setRevenue({ ...revenue, month: `${e.target.value}-01` })}
            required
          />
          <input
            placeholder="Amount"
            type="number"
            value={revenue.amount}
            onChange={e => setRevenue({ ...revenue, amount: e.target.value })}
            required
          />
        </>
      )}

      {type === 'expense' && (
        <>
          <input
            placeholder="Category"
            value={expense.category}
            onChange={e => setExpense({ ...expense, category: e.target.value })}
            required
          />
          <input
            type="date"
            value={expense.date}
            onChange={e => setExpense({ ...expense, date: e.target.value })}
            required
          />
          <input
            placeholder="Amount"
            type="number"
            value={expense.amount}
            onChange={e => setExpense({ ...expense, amount: e.target.value })}
            required
          />
        </>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default DataForm;
