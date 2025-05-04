import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pawzio from '../../assets/pawzio.png';
import API from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    regNo: '',
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [toast, setToast] = useState(''); // Toast message state
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a random number within a range, e.g., between 10000 and 99999
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;

    // Format the registration number with the random number
    const formatted = `P-C-${String(randomNumber).padStart(5, '0')}`;

    // Update the form data with the random registration number
    setFormData((prev) => ({ ...prev, regNo: formatted }));
  }, []);


  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 4) newErrors.name = 'Name must be at least 4 characters';
    if (!formData.username || formData.username.length < 5 || !/\d/.test(formData.username) || !/[!@#$%^&*]/.test(formData.username)) newErrors.username = 'Username must be at least 5 characters and include a number & special character';
    if (!formData.password || formData.password.length < 6 || !/\d/.test(formData.password) || !/[!@#$%^&*]/.test(formData.password)) newErrors.password = 'Password must be at least 6 characters and include a number & special character';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    // If validation passes and the user agrees to terms
    if (Object.keys(validationErrors).length === 0 && agreed) {
      try {
        // Exclude confirmPassword from the form data before sending it
        const { confirmPassword, ...dataToSend } = formData;

        const response = await API.register(dataToSend); // Send only necessary fields
        console.log('Registration response:', response);

        setToast('Registration successful! Redirecting to login...');

        // After 4 seconds, navigate to login page and clear toast
        setTimeout(() => {
          navigate('/login');
          setToast('');
        }, 4000); // Display toast for 4 seconds before redirecting
      } catch (err) {
        console.error('Registration failed:', err.response?.data || err.message);
        // Show a user-friendly message based on error
        alert(err.response?.data?.error || 'Error during registration. Please try again!');
      }
    } else {
      alert('Please fix the errors before submitting');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('https://imgs.search.brave.com/3kj4dLOdFOqaods3TkEMjhEECC2jnwVuuet2duG-BTQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzg0LzM2LzU5/LzM2MF9GXzI4NDM2/NTkzNV9SUUFaTnBx/a2d6SXlDUldpYk0z/YTN0MnRnd1dwa0hQ/MS5qcGc')" }}
    >
      <div className="w-full max-w-lg p-6 bg-white/30 backdrop-blur-sm rounded-xl shadow-md border border-gray-200">
        <div className="flex flex-col items-center">
          <img src={pawzio} alt="Pawzio Logo" className="w-20 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Welcome to Pawzio 🐾</h1>
          <p className="text-gray-500 text-sm text-center mb-6">Start your pet adoption journey with love and care.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="regNo" value={formData.regNo} readOnly className="bg-gray-100 w-full p-3 rounded-md text-gray-700 border border-gray-300" />

          {/* Name and Email in One Row */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="flex-1">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              name="username"
              placeholder="Username (e.g., user1!)"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="accent-blue-500 h-4 w-4"
            />
            <label className="text-sm text-gray-700">I agree to the terms and conditions</label>
          </div>

          <button
            type="submit"
            disabled={!agreed}
            className={`w-full h-11 text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-600 transition duration-200 ${!agreed ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            Register & Begin Your Journey
          </button>
        </form>

        <div className="text-center text-gray-600 text-sm mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-1 hover:underline">
            Go to Login
          </Link>
        </div>
      </div>

      {/* Toast Message */}
      {toast && (
        <div className="fixed top-5 right-5 bg-emerald-100 border border-emerald-500 text-emerald-700 px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-500">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Register;
