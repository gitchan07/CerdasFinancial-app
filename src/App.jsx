import { BrowserRouter, Route, Routes } from "react-router-dom";
import Course from "./pages/CoursePage";
// import React from 'react';
import React from "react";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/course/:courseId" element={<Course />} />
                <Route path="/profile" element={<div>Profile</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
