"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Chart({ data }) {
  if (!data) return <p>No data available</p>;

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Finance",
        data: [data.totalIncome || 0, data.totalExpense || 0],
        backgroundColor: ["#22c55e", "#ef4444"], // GREEN & RED
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white", // 👈 important for dark bg
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
      },
      y: {
        ticks: { color: "white" },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}