"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TreatmentHistoryPage = () => {
  const [treatmentHistory, setTreatmentHistory] = useState([]);

  // Fetch treatment history from API
  useEffect(() => {
    const fetchTreatmentHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5001/treatment");
        setTreatmentHistory(response.data); // Set fetched data
      } catch (error) {
        alert(`Error fetching treatment history: ${error.message}`);
      }
    };

    fetchTreatmentHistory();
  }, []);

  // Function to handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this treatment?")) {
      try {
        await axios.delete(`http://localhost:5001/treatment/${id}`);
        // Remove deleted treatment from the state
        setTreatmentHistory(
          treatmentHistory.filter((treatment) => treatment.id !== id)
        );
        alert("Treatment deleted successfully!");
      } catch (error) {
        alert(`Error deleting treatment: ${error.message}`);
      }
    }
  };

  // Function to handle update (redirect or modal can be implemented as needed)
  const handleUpdate = (id) => {
    // Redirect to update page or open modal for updating treatment
    alert(`Update treatment with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h2 className="text-2xl font-bold mb-6">Treatment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-black">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black p-2">ID</th>
              <th className="border border-black p-2">Patient Name</th>
              <th className="border border-black p-2">Prescribe</th>
              <th className="border border-black p-2">Medicine Description</th>
              <th className="border border-black p-2">Illness Description</th>
              <th className="border border-black p-2">Treatment Type</th>
              <th className="border border-black p-2">Date</th>
              <th className="border border-black p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {treatmentHistory.map((treatment) => (
              <tr key={treatment.id} className="hover:bg-gray-100">
                <td className="border border-black p-2">{treatment.id}</td>
                <td className="border border-black p-2">
                  {treatment.patient_name}
                </td>
                <td className="border border-black p-2">
                  {treatment.prescribe}
                </td>
                <td className="border border-black p-2">
                  {treatment.medicine_discription}
                </td>
                <td className="border border-black p-2">
                  {treatment.Illness_description}
                </td>
                <td className="border border-black p-2">
                  {treatment.treatment_type_discription}
                </td>
                <td className="border border-black p-2">
                  {new Date(treatment.date_time).toLocaleString()}
                </td>
                <td className="border border-black p-2">
                  <button
                    onClick={() => handleUpdate(treatment.id)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(treatment.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TreatmentHistoryPage;
