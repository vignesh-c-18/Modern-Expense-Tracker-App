import React from 'react';
import { motion } from 'framer-motion';

const categoryColors = {
  Food: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
  Transportation: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  Utilities: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400',
  Entertainment: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
  Shopping: 'bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400',
  Other: 'bg-gray-100 text-gray-600 dark:bg-gray-800/80 dark:text-gray-300',
};

const ExpenseCard = ({ expense, onDelete }) => {
  const colorClass = categoryColors[expense.category] || categoryColors.Other;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="glass-card mb-3 p-4 flex justify-between items-center"
    >
      <div className="flex flex-col">
        <span className="font-semibold text-lg">{expense.title}</span>
        <div className="flex gap-2 items-center text-sm opacity-70 mt-1">
          <span>{expense.date}</span>
          <span className="w-1 h-1 rounded-full bg-current"></span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
            {expense.category}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold">₹{parseFloat(expense.amount).toFixed(2)}</span>
        <button 
          onClick={() => onDelete(expense.id)}
          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition"
          title="Delete"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

export default ExpenseCard;
