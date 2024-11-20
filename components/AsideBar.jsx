"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AsideBar = ({ role }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Log the role and token values for debugging
    console.log("Role:", role);
    console.log("Token:", token);

    if (!token) {
      router.push("/");
    }
  }, [router, role]);

  const getActiveClass = (path) => {
    return router.pathname === path
      ? "border-t-2 border-b-2 border-black border-r-4 border-r-black"
      : "border-transparent hover:border-t-2 hover:border-b-2 hover:border-black hover:border-r-4 hover:border-r-black";
  };

  return (
    <div className="h-screen w-64 text-black flex flex-col py-6">
      <nav className="flex-1">
        <ul className="space-y-2 mt-30">
          <li>
            <Link href="/" className={`block p-4 ${getActiveClass("/")}`}>
              Home
            </Link>
          </li>

          {/* Conditional rendering based on user role */}
          {role === "admin" && (
            <li>
              <Link
                href="/admin"
                className={`block p-4 ${getActiveClass("/admin")}`}
              >
                Admin
              </Link>
            </li>
          )}

          {role === "doctor" && (
            <li>
              <Link
                href="/consultant"
                className={`block p-4 ${getActiveClass("/consultant")}`}
              >
                Doctor
              </Link>
            </li>
          )}

          {role === "staff" && (
            <li>
              <Link
                href="/staff"
                className={`block p-4 ${getActiveClass("/staff")}`}
              >
                Staff
              </Link>
            </li>
          )}

          {/* Show Login links only if the user is not logged in */}
          {!localStorage.getItem("token") && (
            <>
              <li>
                <Link
                  href="/login"
                  className={`block p-4 ${getActiveClass("/login")}`}
                >
                  Login as Admin
                </Link>
              </li>
              <li>
                <Link
                  href="/login-doctor"
                  className={`block p-4 ${getActiveClass("/login-doctor")}`}
                >
                  Login as Doctor
                </Link>
              </li>
              <li>
                <Link
                  href="/login-staff"
                  className={`block p-4 ${getActiveClass("/login-staff")}`}
                >
                  Login as Staff
                </Link>
              </li>
            </>
          )}

          {/* Show Logout if user is logged in */}
          {localStorage.getItem("token") && (
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left p-4 border-transparent hover:border-t-2 hover:border-b-2 hover:border-black hover:border-r-4 hover:border-r-black"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default AsideBar;
