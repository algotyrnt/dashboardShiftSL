import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/Navbar";
import AssignDoctorForm from "./Components/AssignDoctorForm";
import Header from "./Components/Header"; // Import Header component

const App: React.FC = () => {
    return (
        <Router>
            <Box sx={{ display: "flex" }}>
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Header /> {/* Add Header component */}
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
};

export default App;
