"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AsideBar = ({ role }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear local storage and redirect to the login page
    localStorage.clear();
    router.push("/");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="h-screen w-64 pt-80 flex flex-col py-6 border-r border-black">
      <nav className="flex-1">
        <ul className="space-y-2  mt-30">
         
          <li>
            <Link
              href="/"
              className="block p-4  hover:border-l-4 hover:border-black"
            >
              Home
            </Link>
          </li>

          {role === "admin" && (
            <li>
              <Link
                href="/admin"
                className="block p-4  hover:border-l-4 hover:border-black"
              >
                Admin
              </Link>
            </li>
          )}

          {role === "consultant" && (
            <li>
              <Link
                href="/consultant"
                className="block p-4  hover:border-l-4 hover:border-black"
              >
                Doctor
              </Link>
            </li>
          )}

          {role === "staff" && (
            <li>
              <Link
                href="/staff"
                className="block p-4 hover:border-l-4 hover:border-black"
              >
                Staff
              </Link>
            </li>
          )}

          {localStorage.getItem("token") ? (
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left p-4 hover:border-l-4 hover:border-black"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                href="/login"
                className="block p-4 hover:border-l-4 hover:border-black"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default AsideBar;
