"use client";
import React from "react";
import Link from "next/link";
import NavBar from "./NavBar";
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
    <div>
      <div className="h-screen w-64  bg-white text-black font-bold font-3xl flex flex-col py-6  justify-center">
        <nav className="flex-2">
          <ul className="space-y-2 mt-10">
            <li>
              <Link href="/" className="block p-4 hover:bg-gray-700">
                Home
              </Link>
            </li>

            {role === "admin" && (
              <li>
                <Link href="/admin" className="block p-4 hover:bg-gray-700">
                  Admin
                </Link>
              </li>
            )}
            {role === "doctor" ||
              (role === "admin" && (
                <li>
                  <Link
                    href="/consultant"
                    className="block p-4 hover:bg-gray-700"
                  >
                    Consultant
                  </Link>
                </li>
              ))}
            {role === "staff" ||
              role ===
                "admin"(
                  <li>
                    <Link href="/staff" className="block p-4 hover:bg-gray-700">
                      Staff Member
                    </Link>
                  </li>
                )}

            {/* Show Logout if user is logged in, else show Login */}
            {localStorage.getItem("token") ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left p-4 hover:bg-gray-700"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link href="/login" className="block p-4 hover:bg-gray-700">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AsideBar;
