import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './Components/AuthPage'// Adjust the import path as necessary
import Dashboard from './Components/Dashboard';
import AddInventoryForm from './Components/AddInventoryForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addtoinventory" element={<AddInventoryForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;