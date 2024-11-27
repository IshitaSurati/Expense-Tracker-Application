import React, { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ expenses }) => {
  const chartRef = useRef(null);

  // Calculate expenses by category
  const categories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  // Chart data structure
  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // Pie chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevents chart distortion
    plugins: {
      legend: {
        position: "top",
      },
    },
    aspectRatio: 1,
  };

  // Destroy chart instance if expenses change
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  }, [expenses]);

  return (
    <div className="charts" style={{ height: "400px", width: "100%" }}>
      <h3>Expenses by Category</h3>
      <Pie ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default Charts;
