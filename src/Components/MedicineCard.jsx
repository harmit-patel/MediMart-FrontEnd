import { FaPills, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MedicineCard({ med, handleIncreaseStock, handleDecreaseStock, handleDeleteMedicine, handleStatusChange }) {
  const LOW_STOCK_THRESHOLD = 10;

  return (
    <motion.div
      className={`w-64 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between ${
        med.stock === 0
          ? "bg-red-100 border-l-4 border-red-500"
          : med.stock <= LOW_STOCK_THRESHOLD
          ? "bg-yellow-100 border-l-4 border-yellow-500"
          : "bg-white border-l-4 border-blue-500"
      }`}
      whileHover={{ scale: 1.05 }}
    >
      {/* Medicine Info */}
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-blue-200 rounded-full">
          <FaPills className="text-2xl text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{med.name}</h3>
          <p className="text-sm text-gray-600">{med.brandName}</p>
        </div>
      </div>

      {/* Medicine Details */}
      <div className="mt-3 space-y-1 text-gray-700">
        <p>💊 Dosage: {med.dosage}</p>
        <p>💲 Unit Price: ${med.unitPrice}</p>
        <p>📦 Stock: <span className="font-bold">{med.stock}</span></p>
      </div>

      {/* Status Indicator */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-3 py-1 rounded-lg text-sm font-semibold shadow-md ${
            med.status === "Available"
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          {med.status}
        </button>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleIncreaseStock(med.id)}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <FaPlus />
          </button>
          <button
            onClick={() => handleDecreaseStock(med.id)}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <FaMinus />
          </button>
          <button
            onClick={() => handleDeleteMedicine(med.id)}
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </motion.div>
  );
}