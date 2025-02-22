import { FaUserMd, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function Sidebar({ setShowForm }) {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-6 flex flex-col z-10">
      <h2 className="text-2xl font-bold mb-6">HealthMate</h2>
      <nav className="flex flex-col space-y-4">
        <a href="#" className="flex items-center space-x-2 p-3 rounded bg-blue-700">
          <FaUserMd /> <span>Dashboard</span>
        </a>
        <a
          href="#"
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 p-3 rounded hover:bg-blue-700"
        >
          <FaCalendarAlt /> <span>Add To Inventory</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-3 rounded hover:bg-blue-700">
          <FaUser /> <span>Doctors</span>
        </a>
      </nav>
    </aside>
  );
}