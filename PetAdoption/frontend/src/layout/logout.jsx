import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn, setIsAdminLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user and admin-related localStorage items
    localStorage.clear();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdminLoggedIn');

    // Set logged-in states to false
    setIsLoggedIn(false);

    // Only call setIsAdminLoggedIn if it's provided (i.e., user is admin)
    if (setIsAdminLoggedIn) {
      setIsAdminLoggedIn(false);
    }

    // Redirect to login page (user or admin login based on context)
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 text-center space-y-6">
        <div className="text-5xl">👋</div>
        <h2 className="text-2xl font-bold text-gray-800">Leaving so soon?</h2>
        <p className="text-gray-600 text-sm">We’ll miss you! Are you sure you want to sign out?</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => navigate(-1)} // Cancel logout, go back
            className="w-full sm:w-auto px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
          >
            Nope, stay! 🙃
          </button>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-6 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-400 transition"
          >
            Yes, log me out 🚪
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
