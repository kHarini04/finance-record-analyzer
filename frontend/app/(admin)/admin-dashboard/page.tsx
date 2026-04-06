"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../lib/api";
import Chart from "../../../components/Chart";
import Navbar from "../../../components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleGuard from "@/components/RoleGuard";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    API.get("/dashboard").then((res) => setData(res.data)); // ✅ use same endpoint
  }, []);

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["ADMIN"]}>
        <Navbar />

        <div className="p-6 bg-gray-900 min-h-screen text-white">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

          {/* 🔥 ACTION BUTTONS */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => router.push("/records")}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
              ➕ Manage Records
            </button>

            <button
              onClick={() => router.push("/users")}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
            >
              👥 Manage Users
            </button>
          </div>

          {/* 📊 DASHBOARD CONTENT */}
          {!data ? (
            <p>Loading...</p>
          ) : data.totalIncome === 0 && data.totalExpense === 0 ? (
            <p className="text-gray-400">
              No records yet. Click "Manage Records" to add data.
            </p>
          ) : (
            <div className="bg-gray-800 p-4 rounded shadow">
              <Chart data={data} />
            </div>
          )}
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}