import React, { useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ expenses }) => {
  const chartRef = useRef(null);

  const categories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance to prevent 'canvas already in use' error
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  }, [expenses]);

  return (
    <div className="charts">
      <h3>Expenses by Category</h3>
      <Pie ref={chartRef} data={data} />
    </div>
  );
};

export default Charts;
