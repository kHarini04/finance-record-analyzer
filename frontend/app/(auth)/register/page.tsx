"use client";

import { useState } from "react";
import API from "../../../lib/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      if (!form.name || !form.email || !form.password) {
        setError("All fields are required");
        return;
      }

      await API.post("/auth/register", form);

      setSuccess("Account created successfully 🎉");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-900 to-blue-100">
      
      {/* 🔥 GLASS CARD */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-96 text-white">
        
        <h2 className="text-3xl font-bold text-black text-center mb-6">
          Create Account 
        </h2>

      
        {error && (
          <p className="bg-red-500/20 text-red-300 text-sm p-2 rounded mb-4">
            {error}
          </p>
        )}

       
        {success && (
          <p className="bg-green-500/20 text-green-300 text-sm p-2 rounded mb-4">
            {success}
          </p>
        )}

        
        <input
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

     
        <input
          placeholder="Email"
          type="email"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* 🔘 BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-900 hover:from-purple-500 hover:to-indigo-600 transition duration-300 font-semibold shadow-lg"
        >
          Register
        </button>

        
        <p className="text-center text-sm md:text-lg mt-4 text-black">
          Already have an account?{" "}
          <span
            className="text-black cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}