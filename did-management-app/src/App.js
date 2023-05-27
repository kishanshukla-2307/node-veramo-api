import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import DIDList from "./pages/DIDList";
import DIDManagement from "./pages/DIDManagement";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/did-list" element={<DIDList />} />
          <Route path="/did-management" element={<DIDManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
