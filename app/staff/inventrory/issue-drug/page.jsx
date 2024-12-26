"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const IssueDrugPage = () => {
  const [drugs, setDrugs] = useState([]);
  const [selectedDrugId, setSelectedDrugId] = useState("");
  const [selectedDrugPrice, setSelectedDrugPrice] = useState(0); // Default price
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ownerNic, setOwnerNic] = useState("");
  const [petName, setPetName] = useState("");

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/inventory/drugs"
        );
        setDrugs(response.data);
      } catch (error) {
        console.error("Error fetching drugs:", error);
      }
    };

    fetchDrugs();
  }, []);

  const handleDrugChange = (e) => {
    const drugId = e.target.value;
    setSelectedDrugId(drugId);

    // Find the selected drug and set its price
    const selectedDrug = drugs.find((drug) => drug.id === drugId);
    if (selectedDrug) {
      const price = parseFloat(selectedDrug.price); // Convert price to number
      setSelectedDrugPrice(price);
      setTotalPrice(price * quantity); // Update total price
    } else {
      setSelectedDrugPrice(0);
      setTotalPrice(0);
    }
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value) || 0; // Ensure quantity is a number
    setQuantity(qty);

    // Update total price
    setTotalPrice(selectedDrugPrice * qty);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      drugId: selectedDrugId,
      quantity: parseInt(quantity),
      ownerNic,
      petName,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/issue-drug",
        requestBody
      );
      setQuantity(0);
      setOwnerNic("");
      setPetName("");
      alert("Drug issued successfully");
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error issuing drug:", error);
      alert("Failed to issue drug. Please check the quantity and try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Issue Drug
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Drug Selection */}
          <div>
            <label
              htmlFor="drug"
              className="block text-gray-700 font-medium mb-2"
            >
              Select Drug:
            </label>
            <select
              id="drug"
              value={selectedDrugId}
              onChange={handleDrugChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select Drug --</option>
              {drugs.map((drug) => (
                <option key={drug.id} value={drug.id}>
                  {drug.drugName}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Drug Price */}
          {selectedDrugPrice > 0 && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price per Unit:
              </label>
              <p className="text-gray-800 font-semibold">
                ${selectedDrugPrice.toFixed(2)}
              </p>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-gray-700 font-medium mb-2"
            >
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Total Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Total Price:
            </label>
            <p className="text-gray-800 font-semibold">
              ${totalPrice.toFixed(2)}
            </p>
          </div>

          {/* Owner NIC */}
          <div>
            <label
              htmlFor="ownerNic"
              className="block text-gray-700 font-medium mb-2"
            >
              Patient NIC:
            </label>
            <input
              type="text"
              id="ownerNic"
              value={ownerNic}
              onChange={(e) => setOwnerNic(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Patient Name */}
          <div>
            <label
              htmlFor="petName"
              className="block text-gray-700 font-medium mb-2"
            >
              Patient Name:
            </label>
            <input
              type="text"
              id="petName"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white font-semibold rounded-md shadow-md"
            >
              Issue Drug
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueDrugPage;
