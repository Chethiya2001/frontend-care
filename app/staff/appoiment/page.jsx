"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddAppoimentpage = () => {
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [availableTimeSlots] = useState([
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ]);
  const [doctors, setDoctors] = useState([]);
  const [selectedNic, setSelectedNic] = useState("");
  const [patients, setPatients] = useState([]);

  const [selectedPatientNic, setSelectedPatientNic] = useState("");
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctorCharge, setDoctorCharge] = useState("");
  const [hospitalCharge, setHospitalCharge] = useState("");

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Details</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h2 { text-align: center; }
            .details { margin: 20px; }
            .details div { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h2>Payment Details</h2>
          <div class="details">
            <div><strong>Charge Doctor:</strong> ${doctorCharge}</div>
            <div><strong>Charge Hospital:</strong> ${hospitalCharge}</div>
            <div><strong>Full Amount:</strong> $${(
              Number(hospitalCharge) + Number(doctorCharge)
            ).toFixed(2)}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handlePayment = async () => {
    // Prepare the payment data
    const paymentData = {
      doctor_charge: doctorCharge,
      hospital_charge: hospitalCharge,
      doctorNic: selectedNic, // Replace with actual doctor NIC from context or props
      patientNic: selectedPatientNic, // Replace with actual patient NIC from context or props
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/payment",
        paymentData
      );
      // Handle the response, e.g., show a success message or redirect
      console.log("Payment successful:", response.data);
      alert("Payment successful!");
      // Reset fields after successful payment
      setDoctorCharge("");
      setHospitalCharge("");
    } catch (error) {
      console.error("Error making payment:", error);
      alert("Error making payment!");
      // Handle error, e.g., show an error message
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

  useEffect(() => {
    if (selectedNic) {
      // Fetch appointments for the selected doctor
      axios
        .get(`http://localhost:5001/appointment/doctor/${selectedNic}`)
        .then((response) => {
          setAppointments(response.data); // Update state with appointment data
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the appointments for this doctor!",
            error
          );
        });
    } else {
      setAppointments([]);
    }
  }, [selectedNic]); // This effect runs when selectedNic changes

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const doctorNic = selectedNic; // Assuming this is the NIC of the doctor
    const patientNic = selectedPatientNic; // Assuming this is the NIC of the patient

    // Create the request body
    const appointmentData = {
      doctorNic,
      patientNic,

      date: date.toISOString().split("T")[0], // Convert date to YYYY-MM-DD format
      time: timeSlot,
      appointmentNumber,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/appointment",
        appointmentData
      );
      console.log("Appointment added successfully:", response.data);
      alert("Appointment added successfully");
      // Optionally, reset the form or show a success message
    } catch (error) {
      console.error("There was an error adding the appointment:", error);
      alert("There was an error adding the appointment");
    }
  };

  return (
    <div>
      {/* Header / Title */}
      <nav className="flex flex-col items-center pt-4 ">
        <div className="flex-grow"></div> {/* White space */}
        <p className="mt-2 text-center text-3xl font-bold">Appoimnets</p>
        <div className="border-b border-black w-full mt-10" />
      </nav>

      {/* Sidebar Section */}
      <div className="flex h-screen ">
        {/* Doctor and Patient Selection */}
        <div className="flex-1 w-64 flex flex-col py-6 border-r border-black">
          <h2 className="text-2xl p-1 mb-4">Select Doctor</h2>

          <div className="flex flex-col p-4">
            <h6 className="text-xl font-bold mb-4">Search Doctor By NIC</h6>
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
          {doctorDetails && (
            <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
              <h3 className="text-lg font-bold mb-2">{doctorDetails.name}</h3>
              <p>
                <strong>Address:</strong> {doctorDetails.address}
              </p>
              <p>
                <strong>Email:</strong> {doctorDetails.email}
              </p>
              <p>
                <strong>Qualifications:</strong> {doctorDetails.qualifications}
              </p>
              <p>
                <strong>Gender:</strong> {doctorDetails.gender}
              </p>
              <p>
                <strong>Contact:</strong> {doctorDetails.contact}
              </p>
              <p>
                <strong>Age:</strong> {doctorDetails.age}
              </p>
              <p>
                <strong>NIC:</strong> {doctorDetails.nic}
              </p>
            </div>
          )}

          <h2 className="text-2xl p-1 mt-6 mb-4">Select Patient</h2>

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

        <div className="flex-grow p-6">
          {/* Flex container for Date Picker and Time Slots */}
          <div className="flex">
            {/* Date Picker Section (Left Side) */}
            <div className="w-1/2 p-4">
              <h4 className="text-xl font-bold mb-2">Select Date</h4>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="dd/MM/yyyy"
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Time Slots and Appointment Section (Right Side) */}
            <div className="w-1/2 p-4">
              {/* Time Slots Section */}
              <h4 className="text-xl font-bold mb-2">Select Time Slot</h4>
              <div className="grid grid-cols-2 gap-4">
                {availableTimeSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`p-2 border rounded-lg ${
                      timeSlot === slot
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-black"
                    }`}
                    onClick={() => setTimeSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              {/* Appointment Number and Submit Section (Moved Below Time Slots) */}
              <div className="w-full p-6 mt-4">
                <div className="mb-4">
                  {/* Appointment Number Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="appointmentNumber"
                      className="text-lg font-bold block mb-1"
                    >
                      Appointment Number:
                    </label>
                    <input
                      type="text"
                      id="appointmentNumber"
                      value={appointmentNumber}
                      onChange={(e) => setAppointmentNumber(e.target.value)}
                      className="border p-2 w-full rounded"
                      placeholder="Enter Appointment Number"
                    />
                  </div>

                  {/* Selected Time Slot Input */}
                  <div>
                    <label
                      htmlFor="selectedTimeSlot"
                      className="text-lg font-bold block mb-1"
                    >
                      Selected Time Slot:
                    </label>
                    <input
                      type="text"
                      id="selectedTimeSlot"
                      value={timeSlot}
                      readOnly
                      className="border p-2 w-full rounded bg-gray-100"
                      placeholder="Select Time Slot"
                    />
                  </div>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="mt-4">
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button className="bg-gray-400 text-white px-6 py-2 rounded ml-4">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Table (Now placed below all other sections) */}
          <div className="w-full p-6 mt-6">
            {/* Wrapper Box with Border and Rounded Corners */}
            <div className="border border-gray-300 rounded-lg p-4">
              <table className="w-full table-auto border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-4 text-left">
                      Appo. Number
                    </th>
                    <th className="border border-gray-300 p-4 text-left">
                      Date
                    </th>
                    <th className="border border-gray-300 p-4 text-left">
                      Time
                    </th>
                    <th className="border border-gray-300 p-4 text-left">
                      Patient Name
                    </th>
                    <th className="border border-gray-300 p-4 text-left">
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through appointments to display each one */}
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="border border-gray-300 p-4">
                          {appointment.appointmentNumber}
                        </td>
                        <td className="border border-gray-300 p-4">
                          {appointment.date}
                        </td>
                        <td className="border border-gray-300 p-4">
                          {appointment.time}
                        </td>
                        <td className="border border-gray-300 p-4">
                          {appointment.Patient.name}
                        </td>
                        <td className="border border-gray-300 p-4">
                          {/* Replace with actual contact info if available */}
                          {appointment.Patient.contact || "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border border-gray-300 p-4" colSpan="5">
                        No appointments available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full p-6 mt-6">
            {/* Wrapper Box with Border and Rounded Corners */}
            <div className="border border-gray-300 rounded-lg p-4 flex justify-between items-start">
              {/* Left Side: Doctor and Hospital Change Text Boxes */}
              <div className="flex flex-col w-1/2">
                {/* Doctor Change Input */}
                <div className="mb-4">
                  <label
                    htmlFor="doctorChange"
                    className="text-lg font-bold block mb-1"
                  >
                    Charge Doctor:
                  </label>
                  <input
                    type="text"
                    id="doctorChange"
                    value={doctorCharge}
                    onChange={(e) => setDoctorCharge(e.target.value)}
                    className="border p-2 w-full rounded"
                    placeholder="Enter new doctor name"
                  />
                </div>

                {/* Hospital Change Input */}
                <div>
                  <label
                    htmlFor="hospitalChange"
                    className="text-lg font-bold block mb-1"
                  >
                    Charge Hospital:
                  </label>
                  <input
                    value={hospitalCharge}
                    onChange={(e) => setHospitalCharge(e.target.value)}
                    type="text"
                    id="hospitalChange"
                    className="border p-2 w-full rounded"
                    placeholder="Enter new hospital name"
                  />
                </div>
              </div>

              {/* Right Side: Full Amount and Payment Button */}
              <div className="flex flex-col items-end w-1/2">
                <div className="mb-4">
                  <h4 className="text-lg font-bold">Full Amount</h4>
                  <p className="text-xl font-semibold text-blue-600">
                    $
                    {(Number(hospitalCharge) + Number(doctorCharge)).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded mr-4"
                    onClick={handlePayment}
                  >
                    Make Payment
                  </button>
                  <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center"
                    onClick={handlePrint}
                  >
                    <FontAwesomeIcon icon={faPrint} className="mr-2" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAppoimentpage;
