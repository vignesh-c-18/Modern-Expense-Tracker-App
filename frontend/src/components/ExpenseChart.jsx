import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ExpenseChart = ({ expenses }) => {
  // Process data for category pie chart
  const categoryData = useMemo(() => {
    const categories = {};
    expenses.forEach(e => {
      categories[e.category] = (categories[e.category] || 0) + parseFloat(e.amount);
    });
    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: [
            'rgba(239, 68, 68, 0.7)',  // Red
            'rgba(59, 130, 246, 0.7)', // Blue
            'rgba(234, 179, 8, 0.7)',  // Yellow
            'rgba(168, 85, 247, 0.7)', // Purple
            'rgba(236, 72, 153, 0.7)', // Pink
            'rgba(107, 114, 128, 0.7)',// Gray
          ],
          borderColor: 'transparent',
        },
      ],
    };
  }, [expenses]);

  // Process data for monthly bar chart
  const monthlyData = useMemo(() => {
    const monthly = {};
    expenses.forEach(e => {
      const monthPath = e.date.substring(0, 7); // YYYY-MM
      monthly[monthPath] = (monthly[monthPath] || 0) + parseFloat(e.amount);
    });
    
    // Sort months
    const sortedMonths = Object.keys(monthly).sort();
    
    return {
      labels: sortedMonths,
      datasets: [
        {
          label: 'Monthly Spending',
          data: sortedMonths.map(m => monthly[m]),
          backgroundColor: 'rgba(99, 102, 241, 0.7)', // Indigo
          borderRadius: 4,
        },
      ],
    };
  }, [expenses]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 mb-6">
      <div className="glass-card p-6 flex-1 h-[300px]">
        <h3 className="text-lg font-semibold mb-4 opacity-80 text-center">Monthly Spending</h3>
        {expenses.length > 0 ? (
          <Bar data={monthlyData} options={chartOptions} />
        ) : (
          <div className="h-full flex items-center justify-center opacity-50">No data available</div>
        )}
      </div>
      <div className="glass-card p-6 flex-1 h-[300px]">
        <h3 className="text-lg font-semibold mb-4 opacity-80 text-center">Spending by Category</h3>
        {expenses.length > 0 ? (
          <Pie data={categoryData} options={chartOptions} />
        ) : (
          <div className="h-full flex items-center justify-center opacity-50">No data available</div>
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
