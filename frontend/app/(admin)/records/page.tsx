"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";
import Navbar from "../../../components/Navbar";

type RecordItem = {
  id: number;
  amount: number;
  type: "income" | "expense";
  category: string;
};

export default function Records() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [form, setForm] = useState<Partial<RecordItem>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const fetchRecords = async () => {
    const res = await API.get("/records");
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // 🔥 ADD / UPDATE
  const handleSubmit = async () => {
    if (!form.amount || !form.type || !form.category) {
      alert("All fields required");
      return;
    }

    if (editingId) {
      await API.put(`/records/${editingId}`, form);
      setEditingId(null);
    } else {
      await API.post("/records", form);
    }

    setForm({});
    fetchRecords();
  };

  // 🔥 DELETE
  const deleteRecord = async (id: number) => {
    await API.delete(`/records/${id}`);
    fetchRecords();
  };

  // 🔥 EDIT
  const editRecord = (r: RecordItem) => {
    setForm(r);
    setEditingId(r.id);
  };

  // 🔥 FILTER
  const filteredRecords =
    filter === "all"
      ? records
      : records.filter((r) => r.category === filter);

  // 🔥 SUMMARY
  const income = records
    .filter((r) => r.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = records
    .filter((r) => r.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div>
      <Navbar />

      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-6">Manage Records</h1>

        {/* 💰 SUMMARY CARDS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-500 p-4 rounded">
            Income: ₹{income}
          </div>
          <div className="bg-red-500 p-4 rounded">
            Expense: ₹{expense}
          </div>
          <div className="bg-blue-500 p-4 rounded">
            Balance: ₹{income - expense}
          </div>
        </div>

        {/* 🔍 FILTER */}
        <div className="mb-4">
          <select
            className="p-2 text-white bg-gray-700 rounded"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            {[...new Set(records.map((r) => r.category))].map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* 🔥 FORM */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <input
            placeholder="Amount"
            className="p-2 text-white rounded"
            value={form.amount || ""}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
          />

          <select
            className="p-2 text-white rounded"
            value={form.type || ""}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value as "income" | "expense",
              })
            }
          >
            <option  value="">Type</option>
            <option className="text-black" value="income">Income</option>
            <option className="text-black" value="expense">Expense</option>
          </select>

          <input
            placeholder="Category"
            className="p-2 text-white rounded"
            value={form.category || ""}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded ${
              editingId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>

        {/* 📊 RECORD LIST */}
        {filteredRecords.length === 0 ? (
          <p className="text-gray-400">No records found</p>
        ) : (
          filteredRecords.map((r) => (
            <div
              key={r.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded mb-2"
            >
              <div>
                <p className="font-semibold">
                  ₹{r.amount} ({r.type})
                </p>
                <p className="text-sm text-gray-400">
                  Category: {r.category}
                </p>
              </div>

             
                <button
                  onClick={() => deleteRecord(r.id)}
                  className="text-red-400"
                >
                  Delete
                </button>
              </div>
            
          ))
        )}
      </div>
    </div>
  );
}