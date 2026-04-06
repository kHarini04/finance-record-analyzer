"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function RoleGuard({ allowedRoles, children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!allowedRoles.includes(role)) {
      router.push("/dashboard"); // fallback
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <Loader />;

  return children;
}