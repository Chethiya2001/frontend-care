"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ViewPatientpage = () => {
  const router = useRouter();

  const [patients, setPatients] = useState([]);

  const [userData, setUserData] = useState(null); // State to hold user data
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile display

  // Fetch patient data from API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5001/patient");
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleSelectPatient = (patient) => {
    console.log(patient);

    router.push(`/consultant/add-treatment?patient=${patient.nic}${patient.name}
      ${patient.email}
      ${patient.contact}
      `);
  };

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
      {/* Header / Title */}
      <nav className="flex flex-col items-center pt-4 ">
        <div className="flex-grow"></div> {/* White space */}
        <p className="mt-2 text-center text-3xl font-bold">Treatments</p>
        <div className="border-b border-black w-full mt-10" />
      </nav>

      {/* Sidebar Section */}
      <div className="flex h-screen">
        {/* Doctor and Patient Selection */}
        <div className="w-64 border-r-2 border-r-black text-black font-bold text-lg flex flex-col py-6 justify-start h-full">
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

          <div className="flex flex-col p-4"></div>
        </div>
        <div className="flex-grow p-6">
          <div className="flex">
            <div className="w-1/2 p-4">
              <h4 className="text-xl font-bold mb-2">Patients</h4>
              <ul>
                {patients.map((patient) => (
                  <li
                    key={patient.nic}
                    className="border p-4 mb-2 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectPatient(patient)}
                  >
                    <h5 className="font-semibold">{patient.name}</h5>
                    <p>{patient.contact}</p>
                    <p>{patient.email}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Add Treatment Section (Left Side) */}
        <div className="p-8">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => router.push("/consultant/add-treatment")}
          >
            Add Treatment
          </button>
        </div>

        {/* Treatment History Section (Right Side) */}
      </div>
    </div>
  );
};

export default ViewPatientpage;
