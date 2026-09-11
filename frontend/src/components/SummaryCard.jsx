import React, { useMemo } from 'react';

const SummaryCard = ({ expenses }) => {
  const total = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0).toFixed(2);
  }, [expenses]);

  const thisMonthTotal = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return expenses
      .filter(exp => {
        const d = new Date(exp.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0).toFixed(2);
  }, [expenses]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-fade-in">
      <div className="glass-card p-5 transform hover:scale-105 transition-transform duration-300 text-center">
        <h4 className="text-sm font-medium opacity-70 uppercase tracking-widest mb-1">Total Expenses</h4>
        <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
          ₹{total}
        </p>
      </div>
      <div className="glass-card p-5 transform hover:scale-105 transition-transform duration-300 text-center">
        <h4 className="text-sm font-medium opacity-70 uppercase tracking-widest mb-1">This Month</h4>
        <p className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">
          ₹{thisMonthTotal}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
