import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../Components/Ui/Input";
import { Button } from "../Components/Ui/Button";
import { Label } from "../Components/Ui/label";
import { User, Mail, Store, MapPin, Lock } from "lucide-react";
import { FaUser, FaStore, FaMapMarkerAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // For navigation
import imgForm from "../assets/img/Authimg4.gif"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    storeName: "",
    location: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(""); // For general error messages
  const [emailError, setEmailError] = useState(""); // For email-specific error messages
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear email error when the user starts typing
    if (id === "email") {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Prepare the payload
    const payload = {
      name: formData.username,
      email: formData.email,
      password: formData.password,
      storeName: formData.storeName,
      location: formData.location,
    };

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Check if the error is due to the email already being registered
        if (errorData.message.includes("email")) {
          setEmailError("Email already registered."); // Set email-specific error
        } else {
          throw new Error(errorData.message || "Registration failed.");
        }
        return;
      }

      // Registration successful
      setError(""); // Clear any previous errors
      setEmailError(""); // Clear email-specific error
      localStorage.setItem('email' , formData.email)
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (err) {
      setError(err.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-indigo-600 items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background circles */}
      <motion.div className="absolute inset-0 z-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      <motion.div className="bg-white shadow-lg rounded-2xl flex overflow-hidden w-full max-w-4xl z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Left Side - Image Section */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-8 bg-gradient-to-br from-blue-400 to-indigo-500">
          <h2 className="text-3xl font-bold text-white text-center">Welcome to MediMart</h2>
          <p className="text-white text-center mt-4">Your trusted partner in health management.</p>
          <img src={imgForm} alt="Doctor" className="rounded-full mt-6 shadow-md border-4 border-white w-48 h-48 object-cover" />
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-6">{isSignUp ? "Sign Up" : "Sign In"}</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display general error message */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isSignUp ? (
              <>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative flex items-center">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input id="username" placeholder="Enter Username" className="pl-10 pr-3 w-full border rounded-md py-2" value={formData.username} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input id="email" type="email" placeholder="email@example.com" className="pl-10 pr-3 w-full border rounded-md py-2" value={formData.email} onChange={handleChange} />
                    </div>
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>} {/* Display email-specific error */}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <div className="relative">
                      <FaStore className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input id="storeName" placeholder="Enter Store Name" className="pl-10 pr-3 w-full border rounded-md py-2" value={formData.storeName} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Store Location</Label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input id="location" placeholder="Enter Store Location" className="pl-10 pr-3 w-full border rounded-md py-2" value={formData.location} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input id="password" type="password" placeholder="••••••••" className="pl-10 pr-3 w-full border rounded-md py-2" value={formData.password} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input id="confirmPassword" type="password" placeholder="••••••••" className="pl-10 pr-3 w-full border rounded-md py-2" value={formData.confirmPassword} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input id="username" placeholder="Enter Username" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
                  </div>
                </div>
              </>
            )}
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
          <p className="text-center text-gray-600 mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <span className="text-indigo-600 cursor-pointer ml-1 font-bold" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}