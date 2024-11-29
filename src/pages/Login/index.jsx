import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../../component/login/LoginPage';
import RegisterPage from '../../component/login/RegisterPage';
import '../../index.css';

const Login = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default Login;
