import React from 'react';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className="glass-card mb-8 p-4 flex justify-between items-center transition-all duration-300">
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">
        💸 Expense Tracker
      </h1>
      <button 
        onClick={toggleTheme}
        className="p-2 rounded-full cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50 transition backdrop-blur-md"
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </nav>
  );
};

export default Navbar;
