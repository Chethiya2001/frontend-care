"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

const ViewPatientpage = () => {
  const router = useRouter();

  const [patients, setPatients] = useState([]);

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
        <div className="w-80 border-r-2 border-r-black text-black font-bold text-lg flex flex-col py-6 justify-start h-full">
          <h2 className="text-2xl p-1 mb-4"> Doctor Profile</h2>

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
