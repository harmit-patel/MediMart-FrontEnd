import { FaSearch, FaFilter } from "react-icons/fa";

export default function SearchFilter({ searchQuery, setSearchQuery, filterStatus, setFilterStatus }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Search and Filter</h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Filter Dropdown */}
        <div className="flex-1 relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <FaFilter className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
    </div>
  );
}