"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";
import Navbar from "../../../components/Navbar";

type User = {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 UPDATE ROLE
  const updateRole = async (id: string, role: string) => {
    await API.patch(`/users/${id}/role`, { role });
    fetchUsers();
  };

  // 🔥 TOGGLE ACTIVE STATUS
  const toggleStatus = async (id: string, isActive: boolean) => {
    await API.patch(`/users/${id}/status`, { isActive: !isActive });
    fetchUsers();
  };

  // 🔍 FILTER + SEARCH
  const filteredUsers = users
    .filter((u) =>
      u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) => (filter === "ALL" ? true : u.role === filter));

  // 🎨 ROLE COLOR
  const roleColor = (role: string) => {
    if (role === "ADMIN") return "bg-red-500";
    if (role === "ANALYST") return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <div>
      <Navbar />

      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <h2 className="text-2xl font-bold mb-6">User Management</h2>

        {/* 🔍 SEARCH + FILTER */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <input
            placeholder="Search by email..."
            className="p-2 rounded text-white"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-2 rounded text-white"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option className="text-black" value="ALL">All Roles</option>
            <option className="text-black" value="ADMIN">Admin</option>
            <option  className="text-black"value="ANALYST">Analyst</option>
            <option className="text-black" value="VIEWER">Viewer</option>
          </select>
        </div>

        {/* 👥 USER LIST */}
        {filteredUsers.length === 0 ? (
          <p className="text-gray-400">No users found</p>
        ) : (
          filteredUsers.map((u) => (
            <div
              key={u.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded mb-3 shadow"
            >
              {/* 📧 USER INFO */}
              <div>
                <p className="font-semibold">{u.email}</p>

                <div className="flex gap-2 mt-1">
                  <span
                    className={`px-2 py-1 text-sm rounded ${roleColor(
                      u.role
                    )}`}
                  >
                    {u.role}
                  </span>

                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      u.isActive
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {u.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* ⚙️ ACTIONS */}
              <div className="flex gap-3 items-center">
                {/* ROLE CHANGE */}
                <select
                  value={u.role}
                  onChange={(e) =>
                    updateRole(u.id, e.target.value)
                  }
                  className="p-1 text-black rounded"
                >
                  <option value="VIEWER">Viewer</option>
                  <option value="ANALYST">Analyst</option>
                  <option value="ADMIN">Admin</option>
                </select>

                {/* STATUS TOGGLE */}
                <button
                  onClick={() => toggleStatus(u.id, u.isActive)}
                  className={`px-3 py-1 rounded ${
                    u.isActive
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {u.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}