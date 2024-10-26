"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddTreatmentpage = () => {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [treatmentID, setTreatmentID] = useState("");
  const [date, setDate] = useState("");
  const [treatmentType, setTreatmentType] = useState("");
  const [illnessDescription, setIllnessDescription] = useState("");
  const [medicalPrescription, setMedicalPrescription] = useState("");
  const [prescribe, setPrescribe] = useState("");
  const [selectedNic, setSelectedNic] = useState("");
  const [patientName, setPatientName] = useState("");
  const [doctorNic, setDoctorNic] = useState("");
  const [selectedPatientNic, setSelectedPatientNic] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);

  const handleDoctorChange = (event) => {
    const nic = event.target.value;
    setSelectedNic(nic);

    if (nic) {
      // Fetch the selected doctor's details
      axios
        .get(`http://localhost:5001/doctor/nic/${nic}`)
        .then((response) => {
          setDoctorDetails(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the doctor details!",
            error
          );
        });
    } else {
      setDoctorDetails(null);
    }
  };

  useEffect(() => {
    // Fetch the doctor data from the backend
    axios
      .get("http://localhost:5001/doctor/name")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the doctors!", error);
      });

    // Fetch the patient data from the backend
    axios
      .get("http://localhost:5001/patient/name")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the patients!", error);
      });
  }, []);

  // Handle Save button click
  const handleSave = async () => {
    const treatmentData = {
      prescribe,
      medicine_discription: medicalPrescription,
      Illness_description: illnessDescription,
      treatment_type_discription: treatmentType,
      date_time: date,
      patient_name: patientName,
      doctorNic,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/treatment",
        treatmentData
      );
      console.log(treatmentData);
      if (response.status === 201) {
        console.log("Treatment added:", response.data);
        alert("Treatment added successfully!");

        clearForm();
      }
    } catch (error) {
      alert("Error adding treatment:", error);
      console.error("Error adding treatment:", error);
    }
  };
  const handlePatientChange = (event) => {
    const nic = event.target.value;
    setSelectedPatientNic(nic);

    if (nic) {
      // Fetch the selected patient's details
      axios
        .get(`http://localhost:5001/patient/nic/${nic}`)
        .then((response) => {
          setPatientDetails(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the patient details!",
            error
          );
        });
    } else {
      setPatientDetails(null);
    }
  };

  const handleCancel = () => {
    clearForm();
  };

  // Function to clear form fields
  const clearForm = () => {
    setTreatmentID("");
    setDate("");
    setTreatmentType("");
    setIllnessDescription("");
    setMedicalPrescription("");
    setPrescribe("");
    setDoctorNic("");
    setPatientName("");
  };

  return (
    <div>
      {/* Header / Title */}
      <nav className="flex flex-col items-center pt-4 ">
        <div className="flex-grow"></div> {/* White space */}
        <p className="mt-2 text-center text-3xl font-bold">Treatment</p>
        <div className="border-b border-black w-full mt-10" />
      </nav>

      {/* Sidebar Section */}
      <div className="flex h-screen">
        {/* Doctor and Patient Selection */}
        <div className="w-80 border-r-2 border-r-black text-black font-bold text-lg flex flex-col py-6 justify-start">
          <h2 className="text-2xl p-4">Doctor Details</h2>

          <div className="flex flex-col p-4">
            <select
              className="mt-2 p-2 w-full border rounded-lg text-gray-700"
              value={selectedNic}
              onChange={handleDoctorChange}
            >
              <option value="">Select a Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.nic} value={doctor.nic}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <h2 className="text-2xl p-4">Patient Details</h2>
          <div className="flex flex-col p-4">
            <h6 className="text-xl font-bold mb-4">Search Patient By NIC</h6>
            <select
              className="mt-2 p-2 w-full border rounded-lg text-gray-700"
              value={selectedPatientNic}
              onChange={handlePatientChange}
            >
              <option value="">Select a Patient</option>
              {patients.map((patient) => (
                <option key={patient.nic} value={patient.nic}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          {patientDetails && (
            <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
              <h3 className="text-lg font-bold mb-2">{patientDetails.name}</h3>
              <p>
                <strong>Address:</strong> {patientDetails.address}
              </p>
              <p>
                <strong>Email:</strong> {patientDetails.email}
              </p>
              <p>
                <strong>Contact:</strong> {patientDetails.contact}
              </p>
              <p>
                <strong>Gender:</strong> {patientDetails.gender}
              </p>
              <p>
                <strong>Age:</strong> {patientDetails.age}
              </p>
              <p>
                <strong>NIC:</strong> {patientDetails.nic}
              </p>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-grow p-6">
          {/* Patient History Section */}
          <div className="border-2 border-gray-300 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4">Patient History</h2>
            <textarea
              className="w-full h-40 p-2 border rounded-lg"
              placeholder="Enter patient's medical history..."
            ></textarea>
          </div>

          {/* Add Treatment Section */}
          <div className="border-2 border-gray-300 p-4 rounded-lg flex flex-col">
            <h2 className="text-xl font-bold mb-4">Add Treatment</h2>

            <div className="flex mb-4">
              <div className="mr-2 w-full">
                <label className="block font-bold mb-2">Treatment ID</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter treatment ID"
                  value={treatmentID}
                  onChange={(e) => setTreatmentID(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="block font-bold mb-2">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex mb-4">
              <div className="mr-2 w-full">
                <label className="block font-bold mb-2">Treatment Type</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter treatment type"
                  value={treatmentType}
                  onChange={(e) => setTreatmentType(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="block font-bold mb-2">
                  Illness Description
                </label>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  placeholder="Describe the illness"
                  value={illnessDescription}
                  onChange={(e) => setIllnessDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="mr-2 w-full">
                <label className="block font-bold mb-2">
                  Medical Prescription
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Medical Prescription"
                  value={medicalPrescription}
                  onChange={(e) => setMedicalPrescription(e.target.value)}
                />
              </div>
              <div className="mr-2 w-full">
                <label className="block font-bold mb-2">Prescribe</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter prescription"
                  value={prescribe}
                  onChange={(e) => setPrescribe(e.target.value)}
                />
              </div>
            </div>

            <div className="flex mb-4">
              <div className="mr-2 w-full">
                <label className="block font-bold mb-2">Doctor NIC</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Doctor NIC"
                  value={selectedNic}
                  onChange={(e) => setSelectedNic(e.target.value)}
                />
              </div>
              <div className="mr-2 w-full">
                <label className="block font-bold mb-2">Patient Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Patient Name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
            </div>

            {/* Buttons Section */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleSave}
                className="p-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="p-2 border rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTreatmentpage;
