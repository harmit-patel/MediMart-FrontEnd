import { useState } from "react";
import { FaUserMd, FaCalendarAlt, FaExclamationTriangle, FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import AddInventoryForm from "./AddInventoryForm";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-700 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">HealthMate</h2>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="flex items-center space-x-2 p-3 rounded bg-purple-800">
            <FaUserMd /> <span>Dashboard</span>
          </a>
          <a
            href="#"
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 p-3 rounded hover:bg-purple-800"
          >
            <FaCalendarAlt /> <span>Add To Inventory</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-3 rounded hover:bg-purple-800">
            <FaUser /> <span>Doctors</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
          <IoMdNotifications className="text-2xl text-gray-600 cursor-pointer" />
        </header>

        {/* Overview Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <FaCalendarAlt className="text-3xl text-green-500 mr-4" />
            <div>
              <p className="text-lg font-semibold">105</p>
              <p className="text-gray-600">Total Inventory</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <FaExclamationTriangle className="text-3xl text-red-500 mr-4" />
            <div>
              <p className="text-lg font-semibold">40</p>
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

        {/* Doctor List */}
        <h2 className="text-xl font-bold text-gray-700 mb-4">Today's Doctors</h2>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <div key={id} className="bg-white p-4 rounded-lg shadow text-center">
              <img
                src={`https://via.placeholder.com/100`}
                alt="Doctor"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold">Dr. John Doe</h3>
              <p className="text-gray-500">Orthopedic</p>
              <p className="text-gray-600 mt-2">10:30 AM - 3:30 PM</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Inventory Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <AddInventoryForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
