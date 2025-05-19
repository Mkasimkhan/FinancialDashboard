import React, { useState } from 'react';

const DataForm = ({ data, setData }) => {
  const [revenue, setRevenue] = useState({ month: '', amount: '' });
  const [expense, setExpense] = useState({ category: '', amount: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(prev => ({
      ...prev,
      revenue: [...prev.revenue, revenue],
      expenses: {
        ...prev.expenses,
        [expense.category]: (prev.expenses[expense.category] || 0) + Number(expense.amount)
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add Data</h2>
      <input
        type="month"
        onChange={e => setRevenue({ ...revenue, month: `${e.target.value}-01` })}
        required
      />
      <input placeholder="Amount" type="number" onChange={e => setRevenue({ ...revenue, amount: Number(e.target.value) })} required />
      <input placeholder="Category" onChange={e => setExpense({ ...expense, category: e.target.value })} required />
      <input placeholder="Expense Amount" type="number" onChange={e => setExpense({ ...expense, amount: Number(e.target.value) })} required />
      <button type="submit">Add</button>
    </form>
  );
};

export default DataForm;