import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import OverviewCards from "./OverviewCards";
import ExcelUpload from "./ExcelUpload";
import SearchFilter from "./SearchFilter";
import MedicineList from "./MedicineList";
import AddInventoryForm from "./AddInventoryForm";
import Profile from "./Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [showProfile , setShowProfile] = useState(false)
  const storedEmail = localStorage.getItem("email");
  const [editDetail , setEditDetail] = useState([])
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  useEffect(() => {
    const fetchData = async () => {
      const getEmail = localStorage.getItem('email')
      const formData = {
        email : getEmail
      }
      try {
        const response = await fetch("http://localhost:8080/inventory/getByEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const data = await response.json(); // Parse JSON response
        console.log(data)
        setMedicines(data); // Update state with fetched medicines
        const editData = data.map((d) => ({
          medicine: { id: d.id },
          quantity: d.quantity
        }));
        setEditDetail(editData);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
  
    fetchData();
  }, []);
  
  const handleIncreaseStock = (id) => {
    // Find the current quantity of the medicine
    const medicine = medicines.find((med) => med.id === id);
    if (!medicine) return; // Exit if the medicine isn't found
    
    const updatedQuantity = medicine.quantity + 1;
  
    // Update edit detail state
    // Update edit details state correctly
  setEditDetail((prev) =>
    prev.map((detail) =>
      detail.medicine.id === id
        ? { ...detail, quantity: updatedQuantity }
        : detail
    )
  );
  
    // Update medicines state
    setMedicines((prev) =>
      prev.map((med) =>
        med.id === id ? { ...med, quantity: updatedQuantity } : med
      )
    );
  };
  

  const handleDecreaseStock = (id) => {
    // Find the current quantity of the medicine
    const medicine = medicines.find((med) => med.id === id);
    if (!medicine) return; // Exit if the medicine isn't found
    
    const updatedQuantity = medicine.quantity > 0 ? medicine.quantity - 1 : medicine.quantity;
  
    // Update edit detail state
    setEditDetail((prev) =>
      prev.map((detail) =>
        detail.medicine.id === id
          ? { ...detail, quantity: updatedQuantity }
          : detail
      )
    );
  
    // Update medicines state
    setMedicines((prev) =>
      prev.map((med) =>
        med.id === id ? { ...med, quantity: updatedQuantity } : med
      )
    );
  };

  const handleDeleteMedicine =async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this medicine?");
    if (!confirmDelete) return;
    console.log("Deleting medicine with ID:", id);

    const deletePayload = {
      email:storedEmail,
        medicine: { id: id }
    };

    try {
        const response = await fetch("http://localhost:8080/inventory/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(deletePayload),
        });

        if (!response.ok) {
            throw new Error("Failed to delete medicine");
        }

        // Remove the medicine from the state after successful deletion
        setMedicines((prev) => prev.filter((med) => med.id !== id));
        setEditDetail((prev) => prev.filter((detail) => detail.medicine.id !== id));
        toast.success("Medicine deleted successfully");

    } catch (error) {
        toast.error("Error deleting medicine");
    }
  };

  const saveDetail = async (id) => {
      console.log(editDetail)
    const medicine = medicines.find((med) => med.id === id);
    if (!medicine) {
        console.error("Medicine not found!");
        return;
    }

    // Find the corresponding edit detail entry
    var editMedicine = editDetail.find((detail) => detail.medicine.id === id);
    if (!editMedicine) {
        console.error("Edit detail not found for this medicine!");
        return;
    }
    editMedicine = {
      ...editMedicine,
      email:storedEmail
    }
    try { 
        const response = await fetch("http://localhost:8080/inventory/updateQuantity", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editMedicine),
        });

        if (!response.ok) {
            throw new Error("Failed to update quantity");
        }

        toast.success("Quantity updated successfully");
    } catch (error) {
        toast.error("Error updating quantity!");
        console.error(error);
        // Optionally, revert state if update fails
        setMedicines((prev) =>
            prev.map((med) =>
                med.id === id ? { ...med, quantity: medicine.quantity } : med
            )
        );
    }
};


  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-indigo-600 relative overflow-hidden">
      <Sidebar setShowForm={setShowForm} setShowProfile={setShowProfile}/>
      <div className="flex-1 p-6 bg-gray-100 z-10 overflow-y-auto">
        <Header />
        <OverviewCards medicines={medicines}/>
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
          saveDetail={saveDetail}
        />
        <ToastContainer />
      </div>
      {showForm && (
  <div className="p-9"> {/* Add padding here */}
    <AddInventoryForm onClose={() => setShowForm(false)} />
  </div>
)}
  {showProfile && (
    <div className="p-9"> {/* Add padding here */}
    <Profile onClose={() => setShowProfile(false)} />
  </div>
  )}
    </div>
  );
}