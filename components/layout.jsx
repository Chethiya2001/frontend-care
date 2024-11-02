"use client";
import AsideBar from "@/components/AsideBar";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { FaUserCircle } from "react-icons/fa"; // Import a user icon from react-icons

export default function Layout({ children }) {
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState(null); // State to hold user data
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile display

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleProfileClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No user logged in");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Set the token in the Authorization header
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data); // Store the fetched user data
        setShowProfile(true); // Show the user profile
      } else {
        alert("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex">
        <AsideBar role={{ role }} />
        <main className="flex-1 p-4">{children}</main>
        {/* Right User Info Sidebar */}
        <div className="h-screen w-44 flex flex-col py-6 border-l border-black bg-white-100">
          <h2 className="text-xl font-bold text-center">User Info</h2>
          <div className="flex flex-col items-center mt-4">
            {localStorage.getItem("token") ? (
              <div className="relative">
                <FaUserCircle
                  className="text-6xl cursor-pointer"
                  onClick={handleProfileClick} // Fetch and show user data on click
                />
              </div>
            ) : (
              <p className="text-gray-500">No user logged in</p>
            )}
          </div>
          {/* Display User Data when showProfile is true */}
          {showProfile && userData && (
            <div className="mt-4 p-4 border rounded bg-gray-200">
              <h3 className="font-sans">User Profile</h3>
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Contact:</strong> {userData.contact}
              </p>
              <p>
                <strong>NIC:</strong> {userData.nic}
              </p>
              <p>
                <strong>Role:</strong> {userData.role}
              </p>
              <button
                onClick={() => setShowProfile(false)}
                className="mt-2 py-1 px-2 bg-red-500 text-white rounded"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
