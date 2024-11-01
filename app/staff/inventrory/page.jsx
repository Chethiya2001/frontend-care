"use client";
import { useRouter } from "next/navigation";
import React from "react";

const InventoryPage = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8">Inventory Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Make Inventory Card */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Make Inventory</h2>
          <p className="text-gray-600 mb-6">Add new items to your inventory.</p>
          <button
            onClick={() => handleNavigation("/staff/inventrory/make-inventory")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Go to Make Inventory
          </button>
        </div>

        {/* View Inventory Card */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Issue Drugs</h2>
          <p className="text-gray-600 mb-6">Issueing Drugs.</p>
          <button
            onClick={() => handleNavigation("/staff/inventrory/issue-drug")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
          >
            Go to View Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
