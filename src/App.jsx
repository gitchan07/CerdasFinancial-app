// import React from 'react';
import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
                <Route path="/home" element={<div><HomePage/></div>} />
                <Route
                    path="/course/:courseId"
                    element={<div>Course detail page</div>}
                />
                <Route path="/profile" element={<div>Profile</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
