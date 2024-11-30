import React from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../../assets/login.jpg';

const LoginPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full h-full md:flex-row flex-col bg-white shadow-lg overflow-hidden">
        <div className="hidden md:flex md:w-1/2 bg-purple-200 items-center justify-center">
          <div className="p-12 text-center">
            <div
              className="h-80 w-80 bg-cover bg-center mx-auto"
              style={{ backgroundImage: `url(${loginImage})` }} 
            >
            </div>
            <h1
              className="mt-6 text-2xl font-bold custom-subheading"
              style={{ color: '#212121' }}
            >
            Mulai Cerdas Finansial, Akhiri Kekhawatiran Keuangan
            </h1>
          <p
              className="mt-4 text-lg"
              style={{ color: '#212121' }}
          >
          Atur Keuangan Anda dengan Mudah di Satu Aplikasi.
          </p>
        </div>
      </div>

        <div
          className="w-full p-8 md:w-1/2 flex items-center justify-center"
          style={{ backgroundColor: '#7C4DFF1A' }}
        >
          <div className="max-w-md w-full">
            <h2 className="font-david-libre custom-heading text-gray-700">
              Cerdas Financial
            </h2>
            <form className="mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-4 py-2 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full px-4 py-2 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4 text-right">
                <a
                  href="#"
                  className="text-sm"
                  style={{ color: '#7C4DFF' }}
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                style={{ backgroundColor: '#3F51B5' }}
              >
                Sign in
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Are you new?{' '}
                <Link
                  to="/register"
                  className="hover:underline"
                  style={{ color: '#7C4DFF' }}
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
