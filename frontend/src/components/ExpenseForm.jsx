import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.date) return;
    onAddExpense(formData);
    setFormData({ ...formData, title: '', amount: '' });
  };

  return (
    <div className="glass-card p-6 w-full shadow-lg animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Add New Expense</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 opacity-80">Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="e.g. Groceries"
            className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1 opacity-80">Amount (₹)</label>
            <input 
              type="number" 
              name="amount" 
              value={formData.amount} 
              onChange={handleChange} 
              placeholder="0.00"
              step="0.01"
              className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1 opacity-80">Date</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 opacity-80">Category</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option>Food</option>
            <option>Transportation</option>
            <option>Utilities</option>
            <option>Entertainment</option>
            <option>Shopping</option>
            <option>Other</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="mt-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
