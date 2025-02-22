import React, { useEffect, useState } from "react";
import { Mail, MapPin, Store, ExternalLink, Edit2 } from "lucide-react";
import axios from "axios";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const storedEmail = localStorage.getItem("email"); // Get email from localStorage

            if (!storedEmail) {
                setError("No email found in localStorage.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/user/profile?email=${storedEmail}`);

                console.log("API Response:", response.data);
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Failed to load profile. Using static data.");

                // Fallback static data
                setProfile({
                    name: "John Doe",
                    email: storedEmail,  // Use stored email
                    location: "123 Main Street, New York, NY",
                    storeName: "Doe's General Store",
                });
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        console.warn(error);
    }

    if (!profile) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-slate-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="relative p-6">
                    <div className="absolute right-4 top-4">
                        <span className="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-600">
                            Active
                        </span>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-xl flex items-center justify-center">
                            <span className="text-2xl font-semibold text-slate-600">
                                {profile.name.split(" ").map(n => n[0]).join("")}
                            </span>
                        </div>

                        {/* Name and Role */}
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-slate-800">{profile.name}</h2>
                            <p className="text-slate-500">Store Owner</p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-6">
                    {/* Display error message if any */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        {/* Email */}
                        <div className="flex items-center space-x-3 text-slate-600 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                            <Mail className="w-5 h-5 text-slate-400" />
                            <span>{profile.email}</span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center space-x-3 text-slate-600 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                            <MapPin className="w-5 h-5 text-slate-400" />
                            <span>{profile.location}</span>
                        </div>

                        {/* Store */}
                        <div className="flex items-center space-x-3 text-slate-600 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                            <Store className="w-5 h-5 text-slate-400" />
                            <span>{profile.storeName}</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center pt-4 gap-4">
                        <button className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Store
                        </button>
                        <button className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center">
                            <Edit2 className="w-4 h-4 mr-2" />
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;