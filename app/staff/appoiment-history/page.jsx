"use client";
import React, { useState } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar";

const AppoimentHistoryPage = () => {
  // State variables
  const [patientNic, setPatientNic] = useState("");
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [updateData, setUpdateData] = useState({
    date: "",
    time: "",
    appointmentNumber: "",
    doctorNic: "",
    patientNic: "",
  });

  // Fetch appointments by Patient NIC
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/appointment/patient/${patientNic}`
      );
      setAppointmentHistory(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Unable to fetch appointments. Please try again.");
    }
  };

  // Open modal for updating appointment
  const handleUpdate = (id) => {
    const appointment = appointmentHistory.find((item) => item.id === id);
    if (appointment) {
      setUpdateData({
        date: appointment.date,
        time: appointment.time,
        appointmentNumber: appointment.appointmentNumber,
        doctorNic: appointment.doctorNic,
        patientNic: appointment.patientNic,
      });
      setSelectedAppointmentId(id);
      setIsModalOpen(true);
    }
  };

  // Submit updated data
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5001/appointment/${selectedAppointmentId}`,
        updateData
      );
      alert("Appointment updated successfully!");
      setIsModalOpen(false);
      handleSearch(); // Refresh appointment history
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Unable to update appointment. Please try again.");
    }
  };

  // Delete appointment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/appointment/${id}`);
      alert("Appointment deleted successfully!");
      handleSearch(); // Refresh appointment history
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Unable to delete appointment. Please try again.");
    }
  };

  return (
    <div>
      <NavBar hideTitle={true} title="Appointment History" />
      <div className="min-h-screen bg-white text-black p-8">
        {/* Search by Patient NIC */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">
            Search by Patient NIC:
          </label>
          <div className="flex">
            <input
              type="text"
              value={patientNic}
              onChange={(e) => setPatientNic(e.target.value)}
              className="border border-gray-300 p-2 flex-1"
              placeholder="Enter Patient NIC"
            />
            <button
              onClick={handleSearch}
              className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Search
            </button>
          </div>
        </div>

        {/* Appointment Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black p-2">Appointment Number</th>
                <th className="border border-black p-2">Doctor Name</th>
                <th className="border border-black p-2">Patient Name</th>
                <th className="border border-black p-2">Date</th>
                <th className="border border-black p-2">Time</th>
                <th className="border border-black p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointmentHistory.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-100">
                  <td className="border border-black p-2">{appointment.appointmentNumber}</td>
                  <td className="border border-black p-2">
                    {appointment.Doctor.name}
                  </td>
                  <td className="border border-black p-2">
                    {appointment.Patient.name}
                  </td>
                  <td className="border border-black p-2">
                    {appointment.date}
                  </td>
                  <td className="border border-black p-2">
                    {appointment.time}
                  </td>
                  <td className="border border-black p-2 pl-4">
                    <button
                      onClick={() => handleUpdate(appointment.id)}
                      className="mr-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="p-3 text-black bg-gray-300 border border-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Updating Appointment */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-xl font-bold mb-4">Update Appointment</h3>
              <form onSubmit={handleSubmitUpdate}>
                <div className="mb-4">
                  <label className="block mb-2">Date:</label>
                  <input
                    type="date"
                    value={updateData.date}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, date: e.target.value })
                    }
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Time:</label>
                  <input
                    type="time"
                    value={updateData.time}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, time: e.target.value })
                    }
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Appointment Number:</label>
                  <input
                    type="text"
                    value={updateData.appointmentNumber}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        appointmentNumber: e.target.value,
                      })
                    }
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white hover:bg-blue-600 p-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppoimentHistoryPage;
