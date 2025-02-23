import { FaCalendarAlt, FaExclamationTriangle, FaUserMd } from "react-icons/fa";

export default function OverviewCards({ medicines }) {
  const totalStock = medicines.reduce((sum, med) => sum + med.quantity, 0);
  const lowStockMedicines = medicines.filter((med) => med.quantity > 0 && med.quantity <= 10).length;

  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <FaCalendarAlt className="text-3xl text-green-500 mr-4" />
        <div>
          <p className="text-lg font-semibold">{totalStock}</p>
          <p className="text-gray-600">Total Inventory</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <FaExclamationTriangle className="text-3xl text-red-500 mr-4" />
        <div>
          <p className="text-lg font-semibold">{lowStockMedicines}</p>
          <p className="text-gray-600">Low Stock Alerts</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <FaUserMd className="text-3xl text-blue-500 mr-4" />
        <div>
          <p className="text-lg font-semibold">37</p>
          <p className="text-gray-600">Available Doctors</p>
        </div>
      </div>
    </div>
  );
}