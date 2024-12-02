// import React from 'react';
import React from "react";
import Login from "./pages/Login/index";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
