import React, { useEffect, useState } from "react";
import { Mail, MapPin, Store, ExternalLink, Edit2, Calendar } from "lucide-react";
import axios from "axios";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { format, startOfYear, endOfYear } from "date-fns";
import { FaTimes } from "react-icons/fa";

const Profile = ({onClose}) => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        fetchProfile();
        trackUserActivity(); // Track login/signup/visit activity
    }, []);

    useEffect(() => {
        loadActivityData(selectedYear);
    }, [selectedYear]);

    // Fetch user profile from backend
    const fetchProfile = async () => {
        const storedEmail = localStorage.getItem("email");

        if (!storedEmail) {
            setError("No email found in localStorage.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/users/profile/${storedEmail}`);
            console.log("API Response:", response.data);
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setError("Failed to load profile. Using static data.");
            setProfile({
                name: "John Doe",
                email: storedEmail,
                location: "123 Main Street, New York, NY",
                storeName: "Doe's General Store",
            });
        }
    };

    // Track website activity (Login, Signup, or Page Open)
    const trackUserActivity = () => {
        const today = format(new Date(), "yyyy-MM-dd");
        let visits = JSON.parse(localStorage.getItem("visitData")) || [];

        if (!visits.includes(today)) {
            visits.push(today);
            localStorage.setItem("visitData", JSON.stringify(visits));
        }
    };

    // Load user activity from localStorage for heatmap
    const loadActivityData = (year) => {
        const visits = JSON.parse(localStorage.getItem("visitData")) || [];
        const startDate = format(startOfYear(new Date(year, 0, 1)), "yyyy-MM-dd");
        const endDate = format(endOfYear(new Date(year, 11, 31)), "yyyy-MM-dd");

        const visitCounts = visits.reduce((acc, date) => {
            if (date >= startDate && date <= endDate) {
                acc[date] = (acc[date] || 0) + 1;
            }
            return acc;
        }, {});

        const activity = Object.keys(visitCounts).map((date) => ({
            date,
            count: visitCounts[date],
        }));

        setActivityData(activity);
    };

    if (!profile) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-slate-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <FaTimes className="text-2xl" />
                            </button>
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
                                {profile.name.split(" ").map((n) => n[0]).join("")}
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
                        <ProfileItem icon={Mail} text={profile.email} />
                        <ProfileItem icon={MapPin} text={profile.location} />
                        <ProfileItem icon={Store} text={profile.store_name} />
                    </div>

                    {/* Website Activity Heatmap */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">Website Activity</h3>

                        {/* Year Selector */}
                        <div className="flex items-center space-x-2 mb-4">
                            <Calendar className="w-5 h-5 text-slate-700" />
                            <select
                                className="p-2 border rounded-md text-slate-700 bg-white cursor-pointer"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                            >
                                {Array.from({ length: 5 }, (_, i) => (
                                    <option key={i} value={new Date().getFullYear() - i}>
                                        {new Date().getFullYear() - i}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="p-3 bg-gray-100 rounded-md">
                            <CalendarHeatmap
                                startDate={startOfYear(new Date(selectedYear, 0, 1))}
                                endDate={endOfYear(new Date(selectedYear, 11, 31))}
                                values={activityData}
                                classForValue={(value) => {
                                    if (!value) return "fill-gray-200";
                                    if (value.count >= 5) return "fill-green-700";
                                    if (value.count >= 3) return "fill-green-500";
                                    if (value.count >= 2) return "fill-green-300";
                                    return "fill-green-100";
                                }}
                                tooltipDataAttrs={(value) => {
                                    if (!value.date) return null;
                                    return { "data-tip": `${value.count} visits on ${value.date}` };
                                }}
                            />
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

// Reusable Profile Item Component
const ProfileItem = ({ icon: Icon, text }) => (
    <div className="flex items-center space-x-3 text-slate-600 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
        <Icon className="w-5 h-5 text-slate-400" />
        <span>{text}</span>
    </div>
);

export default Profile;
