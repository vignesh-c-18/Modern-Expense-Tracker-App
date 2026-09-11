import React from 'react';

const FilterBar = ({ filterText, filterCategory, onFilterTextChange, onFilterCategoryChange }) => {
  return (
    <div className="glass-card mb-6 p-4 flex flex-col md:flex-row gap-4">
      <div className="flex-grow">
        <input 
          type="text" 
          placeholder="Search by title..." 
          value={filterText}
          onChange={(e) => onFilterTextChange(e.target.value)}
          className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      <div className="w-full md:w-64">
        <select 
          value={filterCategory}
          onChange={(e) => onFilterCategoryChange(e.target.value)}
          className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
