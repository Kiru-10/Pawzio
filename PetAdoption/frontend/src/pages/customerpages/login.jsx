import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pawzio from '../../assets/pawzio.png';
import API from '../../services/api';

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // New state to toggle between user/admin login
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;

      // Check if it's admin login or normal user login
      if (isAdmin) {
        response = await API.adminLogin(formData);  // Admin login
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        setIsLoggedIn(true);
        showToast('Admin login successful! Redirecting...');
        setTimeout(() => navigate('/admin'), 2000); // Redirect to admin dashboard
      } else {
        response = await API.login(formData);  // Normal user login
        const { user, token } = response.data;

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setIsLoggedIn(true);
        showToast('Login successful! Redirecting...');
        setTimeout(() => navigate('/'), 2000);  // Redirect to home page
      }

    } catch (err) {
      console.error('Login failed:', err);
      const errorMessage = err.response?.data?.error || 'Login failed. Please try again!';
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://imgs.search.brave.com/T_huzdb4ZfAdoZwLVeOJQPNfo7YalODj3ZQ0QLILz_8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzY1LzUxLzQ5/LzM2MF9GXzQ2NTUx/NDkwNl9FOVA5OE45/anNHeHhjZkM4Mllq/cTZxRTQ1cE11Q01Z/cy5qcGc')",
      }}
    >
      <div className="w-full max-w-md p-6 bg-white/30 backdrop-blur-sm rounded-xl shadow-md border border-gray-200">
        <div className="flex flex-col items-center space-y-4">
          <img src={pawzio} alt="Pawzio Logo" className="w-20" />
          <h1 className="text-3xl font-bold text-gray-800 text-center">Sign In to Pawzio 🐾</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
            className="bg-white w-full p-3 rounded-md placeholder:text-gray-400 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="bg-white w-full p-3 rounded-md placeholder:text-gray-400 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Admin Login Toggle */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="adminLogin"
              checked={isAdmin}
              onChange={() => setIsAdmin((prev) => !prev)}
              className="mr-2"
            />
            <label htmlFor="adminLogin" className="text-gray-600">Login as Admin</label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-11 text-white font-semibold rounded-md transition duration-200 ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            {isLoading ? 'Signing in...' : 'Enter Pet Paradise'}
          </button>
        </form>

        <div className="text-gray-600 text-center mt-4">
          Not part of our furry family yet?
          <Link to="/register" className="text-blue-500 cursor-pointer ml-1 hover:underline">
            Create your profile
          </Link>
        </div>
      </div>

      {toast.show && (
        <div className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-500 ${toast.type === 'error'
            ? 'bg-red-100 border border-red-500 text-red-700'
            : 'bg-emerald-100 border border-emerald-500 text-emerald-700'
          }`}>
          {toast.message}
        </div>
      )}

      <Link to="/" className="fixed bottom-5 right-5 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l9-7 9 7v8a2 2 0 01-2 2h-4m-6 0H5a2 2 0 01-2-2v-8z" />
        </svg>
      </Link>

    </div>
  );
};

export default Login;
