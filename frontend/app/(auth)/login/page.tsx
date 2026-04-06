"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import API from "../../../lib/api";
import { AuthContext } from "../../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/login", form);

      login(res.data);

      if (res.data.user.role === "ADMIN") {
        router.push("/admin-dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-900 via-purple-100 to-indigo-900">
      
      {/* 🔥 GLASS CARD */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-96 text-white">
        
        <h2 className="text-3xl text-black font-bold text-center mb-6">
          Welcome Back !
        </h2>

        
        {error && (
          <p className="bg-red-500/20 text-red-300 text-sm p-2 rounded mb-4">
            {error}
          </p>
        )}

        
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* 🔑 PASSWORD */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 transition duration-300 font-semibold shadow-lg"
        >
          Login
        </button>

       
        <p className="text-center text-sm mt-4 text-black">
          Don’t have an account?{" "}
          <span
            className="text-black cursor-pointer hover:underline"
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}