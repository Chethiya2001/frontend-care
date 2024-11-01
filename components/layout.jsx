"use client";
import AsideBar from "@/components/AsideBar";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
export default function Layout({ children }) {
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);
  return (
    <div>
      <NavBar />
      <div className="flex">
        <AsideBar role={{ role }} />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
