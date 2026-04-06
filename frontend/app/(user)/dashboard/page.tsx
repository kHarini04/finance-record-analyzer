"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";
import Chart from "../../../components/Chart";
import Navbar from "../../../components/Navbar";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    API.get("/dashboard").then((res) => setData(res.data));
  }, []);

  return (
    <ProtectedRoute>
      <Navbar />

      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

        {!data ? (
          <p>Loading...</p>
        ) : data.totalIncome === 0 && data.totalExpense === 0 ? (
          <p className="text-gray-400">
            No records yet. Ask admin to add data.
          </p>
        ) : (
          <div className="bg-gray-800 p-4 rounded shadow">
            <Chart data={data} />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}