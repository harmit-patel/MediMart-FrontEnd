import { useState } from "react";

export default function AddInventoryForm({ onClose }) {
  const [formData, setFormData] = useState({
    itemType: "",
    drugName: "",
    drugTypes: "",
    brand: "",
    lotNumber: "",
    expirationDate: "",
    minQuantity: "",
    quantity: "",
    unit: "",
    location: "",
    purchaseOrDonated: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    onClose();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Inventory</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Item Type</label>
            <input name="itemType" placeholder="Item Type" value={formData.itemType} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Drug Name</label>
            <input name="drugName" placeholder="Drug Name" value={formData.drugName} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Drug Type(s)</label>
            <input name="drugTypes" placeholder="Drug Type(s)" value={formData.drugTypes} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lot Number</label>
            <input name="lotNumber" placeholder="Lot Number" value={formData.lotNumber} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
            <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Quantity</label>
            <input name="minQuantity" placeholder="Minimum Quantity" value={formData.minQuantity} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Unit</label>
            <input name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Purchased or Donated?</label>
            <select name="purchaseOrDonated" value={formData.purchaseOrDonated} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Select</option>
              <option value="Purchased">Purchased</option>
              <option value="Donated">Donated</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Info</label>
          <textarea name="additionalInfo" placeholder="Additional Info" value={formData.additionalInfo} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" rows="4"></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Cancel
          </button>
          <button type="submit" className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}