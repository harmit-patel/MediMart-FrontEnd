import { useState } from "react";

export default function AddInventoryForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    dosage: "",
    unitPrice: "",
    stock: "",
    status: "Available",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., add to medicines list)
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Add to Inventory</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Brand Name"
            value={formData.brandName}
            onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Dosage"
            value={formData.dosage}
            onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Unit Price"
            value={formData.unitPrice}
            onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Add Medicine
          </button>
        </div>
      </form>
    </div>
  );
}