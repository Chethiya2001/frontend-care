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

  return (
    <div className="h-screen w-64 text-black flex flex-col py-6">
      <nav className="flex-1">
        <ul className="space-y-2 mt-30">
          <li>
            <Link
              href="/"
              className="block p-4 border-transparent hover:border-r-2 hover:border-r-black"
            >
              Home
            </Link>
          </li>

          {/* Conditional rendering based on user role */}
          {role === "admin" && (
            <li>
              <Link
                href="/admin"
                className="block p-4 border-transparent hover:border-r-2 hover:border-r-black"
              >
                Admin
              </Link>
            </li>
          )}

          {role === "doctor" && (
            <li>
              <Link
                href="/consultant"
               className="block p-4 border-transparent hover:border-r-2 hover:border-r-black"
              >
                Doctor
              </Link>
            </li>
          )}

          {role === "staff" && (
            <li>
              <Link
                href="/staff"
            className="block p-4 border-transparent hover:border-r-2 hover:border-r-black"
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
                 className="block p-4 border-transparent hover:border-r-2 hover:border-r-black"
                >
                  Login as Admin
                </Link>
              </li>
              <li>
                <Link
                  href="/login-doctor"
                  className="block p-4 border-transparent hover:border-r-2 hover:border-r-black"
                >
                  Login as Doctor
                </Link>
              </li>
              <li>
                <Link
                  href="/login-staff"
                 className="block p-4 border-transparent hover:border-r-2 hover:border-r-black"
                >
                  Login as Staff
                </Link>
              </li>
            </>
          )}

          {/* Show Logout if user is logged in */}
          {localStorage.getItem("token") ? (
            <li>
              <button
                onClick={handleLogout}
                className="block p-4 border-transparent hover:border-r-2 hover:border-r-black"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                href="/login"
                className="block p-4 border-transparent hover:border-r-2 hover:border-r-black"
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
