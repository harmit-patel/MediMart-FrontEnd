import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import formimg from "../assets/img/form1.gif";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddInventoryForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        quantity: "",
        reorderLevel: "",
        manufacturingDate: "",
        expDate: "",
        medicine: {
            name: "",
            dosage: "",
            form: "TABLET",
            brandName: "",
        },
        unitPrice: 0.0,
        email: "",
    });

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            setFormData((prevData) => ({ ...prevData, email: storedEmail }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        let newValue = value;
        // Ensure `form` field is always a valid enum value
        if (name === "form" && value === "") return; 
        if (name === "unitPrice") {
            newValue = value === "" ? "" : parseFloat(value); // Convert to number
        }
        if (name in formData.medicine) {
            setFormData({
                ...formData,
                medicine: { ...formData.medicine, [name]: newValue },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    

    const isValidDate = (year, month, day) => {
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    };

    const handleSubmit = async (e) => {
        const [myear, mmonth, mday] = formData.manufacturingDate.split("-").map(Number);
        if (!isValidDate(myear, mmonth, mday)) {
            toast.error("Invalid Manufacturing date! Please select a valid date.");
            return;
        }
        const [year, month, day] = formData.expDate.split("-").map(Number);
        if (!isValidDate(year, month, day)) {
            toast.error("Invalid Expiry date! Please select a valid date.");
            return;
        }
        console.log(formData)
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/inventory/add", formData);
            toast.success("Inventory added successfully!");
        } catch (error) {
            toast.error("Failed to add inventory");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen relative overflow-hidden">
            {/* Motion Background */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/10"
                        style={{
                            width: Math.random() * 80 + 30,
                            height: Math.random() * 80 + 30,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * 100 - 50],
                            x: [0, Math.random() * 100 - 50],
                            scale: [1, Math.random() * 0.5 + 0.8],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>

            {/* Form Container */}
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden z-10">
                {/* Close Icon */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <FaTimes className="text-2xl" />
                </button>

                {/* Form Header */}
                <h2 className="text-2xl font-bold text-center py-6 bg-gradient-to-r from-blue-300 to-indigo-700 text-white flex items-center justify-center">
                    <img src={formimg} alt="Inventory GIF" className="w-10 h-10 mr-2" /> Add Inventory Item
                </h2>

                {/* Form Fields */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
                >
                    <label className="block">
                        Quantity 📦
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </label>
                    <label className="block">
                        Reorder Level ⚠️
                        <input
                            type="number"
                            name="reorderLevel"
                            value={formData.reorderLevel}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </label>
                    <label className="block">
                        Medicine Name 💊
                        <input
                            type="text"
                            name="name"
                            value={formData.medicine.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </label>
                    <label className="block">
                        Manufacturing Date 🏭
                        <input
                            type="date"
                            name="manufacturingDate"
                            value={formData.medicine.manufacturingDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </label>
                    <label className="block">
                        Expiry Date 📅
                        <input
                            type="date"
                            name="expDate"
                            value={formData.medicine.expDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </label>
                    <label className="block">
                        Dosage 💊
                        <input
                            type="text"
                            name="dosage"
                            value={formData.medicine.dosage}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </label>
                    <label className="block">
                        Form 💉
                        <select
    name="form"
    value={formData.medicine.form}
    onChange={handleChange}
    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
>
    <option value="TABLET">TABLET</option>
    <option value="CAPSULE">CAPSULE</option>
    <option value="INJECTION">INJECTION</option>
</select>

                    </label>
                    <label className="block">
                        Unit Price 💵
                        <input
                            type="number"
                            step="0.01"
                            name="unitPrice"
                            value={formData.medicine.unitPrice}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </label>
                    <label className="block">
                        Brand Name 🏷️
                        <input
                            type="text"
                            name="brandName"
                            value={formData.medicine.brandName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddInventoryForm;
