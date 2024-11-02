"use client";
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const FinancialRecodespage = () => {
  // Dummy data for the bar chart and pie chart
  const monthlyData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Income",
        data: [400, 500, 600, 700, 800, 900],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Expenses",
        data: [200, 300, 400, 500, 600, 700],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Marketing", "Operations", "R&D", "Sales"],
    datasets: [
      {
        data: [300, 50, 100, 80],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
      },
    ],
  };

  // Dummy transaction data
  const transactions = [
    { id: 1, date: "2024-10-01", description: "Web Hosting", amount: 50 },
    { id: 2, date: "2024-10-05", description: "Marketing", amount: 150 },
    { id: 3, date: "2024-10-10", description: "Office Supplies", amount: 30 },
    { id: 4, date: "2024-10-15", description: "Salaries", amount: 200 },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Financial Records</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Monthly Overview</h2>
          <Bar data={monthlyData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Expense Breakdown</h2>
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Total Income</h2>
          <p className="text-3xl font-bold">LKR.5,000</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded shadow p-5">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left">Date</th>
              <th className="px-4 py-2 border-b text-left">Description</th>
              <th className="px-4 py-2 border-b text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b">
                  {transaction.description}
                </td>
                <td className="px-4 py-2 border-b">LKR.{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialRecodespage;
