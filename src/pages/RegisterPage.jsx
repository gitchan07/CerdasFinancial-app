import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import registerImage from '../../assets/register.jpg';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/register',
        {
          email,
          full_name: fullName,
          password,
          confirm_password: confirmPassword,
        }
      );

      setSuccessMessage('Registration successful! You can now log in.');
      console.log('Registration successful:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full h-full md:flex-row flex-col bg-white shadow-lg overflow-hidden">
        <div
          className="hidden md:flex md:w-1/2 items-center justify-center"
          style={{
            background: "linear-gradient(to bottom, #7FB9FF, #C8E5FF)"
          }}
        >
          <div className="p-16 text-center">
            <div
              className="h-96 w-96 bg-cover bg-center mx-auto"
              style={{ backgroundImage: `url(${registerImage})` }}
            />
            <h1 className="mt-8 text-3xl font-bold text-gray-800">
              Bergabunglah Bersama Kami!
            </h1>
            <p className="mt-6 text-xl text-gray-700">
              Ciptakan Masa Depan Keuangan yang Lebih Baik.
            </p>
          </div>
        </div>

        <div
          className="w-full p-10 md:w-1/2 flex items-center justify-center"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          <div className="max-w-lg w-full">
            <h2 className="font-david-libre custom-heading text-gray-700 text-2xl">
              Buat Akun Anda
            </h2>
            <form className="mt-6" onSubmit={handleFormSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  className="mt-2 block w-full px-4 py-3 bg-white border rounded-md text-base focus:border-blue-500 focus:ring-blue-500"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  className="mt-2 block w-full px-4 py-3 bg-white border rounded-md text-base focus:border-blue-500 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-2 block w-full px-4 py-3 bg-white border rounded-md text-base focus:border-blue-500 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="mt-2 block w-full px-4 py-3 bg-white border rounded-md text-base focus:border-blue-500 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 text-white text-base rounded-md hover:bg-blue-600 focus:outline-none"
                style={{ backgroundColor: '#2563EB' }}
              >
                Register
              </button>
            </form>
            {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
            {successMessage && (
              <p className="mt-6 text-sm text-green-600">{successMessage}</p>
            )}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="hover:underline text-blue-600" style={{ color: '#2563EB' }}>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
