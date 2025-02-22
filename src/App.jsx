import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './Components/AuthPage'// Adjust the import path as necessary
import Dashboard from './Components/Dashboard';
import AddInventoryForm from './Components/AddInventoryForm';
import Profile from './Components/Profile';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AuthPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addtoinventory" element={<AddInventoryForm />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;