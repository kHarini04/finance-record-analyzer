"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white shadow">
      <h1
        className="text-lg font-semibold cursor-pointer"
        onClick={() => router.push("/")}
      >
        💰 Finance Dashboard
      </h1>

      <div className="flex gap-4 items-center">
        <button
          onClick={() => router.push("/dashboard")}
          className="hover:text-gray-300"
        >
          Dashboard
        </button>

        <button
          onClick={() => router.push("/admin-dashboard")}
          className="hover:text-gray-300"
        >
          Admin
        </button>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}