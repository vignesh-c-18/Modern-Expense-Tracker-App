import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ExpenseCard from './ExpenseCard';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="glass-card p-8 text-center opacity-70">
        <p className="text-lg">No expenses found.</p>
        <p className="text-sm mt-2">Add a new expense to get started or change filters.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
      <AnimatePresence>
        {expenses.map(expense => (
          <ExpenseCard key={expense.id} expense={expense} onDelete={onDeleteExpense} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseList;
