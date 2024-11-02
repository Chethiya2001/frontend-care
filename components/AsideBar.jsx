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
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="h-screen w-64 flex flex-col py-6 border-r border-black">
      <nav className="flex-1">
        <ul className="space-y-2 mt-30">
          <li>
            <Link
              href="/"
              className="block p-4 hover:border-l-4 hover:border-black hover:bg-transparent transition duration-200"
            >
              Home
            </Link>
          </li>
          {role === "admin" && (
            <li>
              <Link
                href="/admin"
                className="block p-4 hover:border-l-4 hover:border-black hover:bg-transparent transition duration-200"
              >
                Admin
              </Link>
            </li>
          )}
          {role === "consultant" && (
            <li>
              <Link
                href="/consultant"
                className="block p-4 hover:border-l-4 hover:border-black hover:bg-transparent transition duration-200"
              >
                Doctor
              </Link>
            </li>
          )}
          {role === "staff" && (
            <li>
              <Link
                href="/staff"
                className="block p-4 hover:border-l-4 hover:border-black hover:bg-transparent transition duration-200"
              >
                Staff
              </Link>
            </li>
          )}
          {/* Show Logout if user is logged in, else show Login */}
          {localStorage.getItem("token") ? (
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left p-4 hover:border-l-4 hover:border-black hover:bg-transparent transition duration-200"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                href="/login"
                className="block p-4 hover:border-l-4 hover:border-black hover:bg-transparent transition duration-200"
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
