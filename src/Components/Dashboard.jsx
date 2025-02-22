import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import OverviewCards from "./OverviewCards";
import ExcelUpload from "./ExcelUpload";
import SearchFilter from "./SearchFilter";
import MedicineList from "./MedicineList";
import AddInventoryForm from "./AddInventoryForm";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Paracetamol", brandName: "Brand A", dosage: "500mg", unitPrice: 10, stock: 50, status: "Available" },
    { id: 2, name: "Ibuprofen", brandName: "Brand B", dosage: "400mg", unitPrice: 15, stock: 0, status: "Out of Stock" },
    { id: 3, name: "Amoxicillin", brandName: "Brand C", dosage: "250mg", unitPrice: 20, stock: 20, status: "Available" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleIncreaseStock = (id) => {
    setMedicines((prev) =>
      prev.map((med) =>
        med.id === id
          ? {
              ...med,
              stock: med.stock + 1,
              status: med.stock + 1 > 0 ? "Available" : "Out of Stock", // Update status based on stock
            }
          : med
      )
    );
  };

  const handleDecreaseStock = (id) => {
    setMedicines((prev) =>
      prev.map((med) =>
        med.id === id
          ? {
              ...med,
              stock: Math.max(0, med.stock - 1),
              status: med.stock - 1 > 0 ? "Available" : "Out of Stock", // Update status based on stock
            }
          : med
      )
    );
  };

  const handleDeleteMedicine = (id) => {
    setMedicines((prev) => prev.filter((med) => med.id !== id));
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-indigo-600 relative overflow-hidden">
      <Sidebar setShowForm={setShowForm} />
      <div className="flex-1 p-6 bg-gray-100 z-10 overflow-y-auto">
        <Header />
        <OverviewCards medicines={medicines} />
        <ExcelUpload />
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <MedicineList
          medicines={medicines}
          searchQuery={searchQuery}
          filterStatus={filterStatus}
          handleIncreaseStock={handleIncreaseStock}
          handleDecreaseStock={handleDecreaseStock}
          handleDeleteMedicine={handleDeleteMedicine}
        />
      </div>
      {showForm && <AddInventoryForm onClose={() => setShowForm(false)} />}
    </div>
  );
}