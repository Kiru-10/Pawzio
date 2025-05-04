import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pawzio from '../assets/pawzio.png';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
    navigate('/logout'); 
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg"
    >
      <div className="px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center" to="/">
            <img className="h-7 w-auto" src={pawzio} alt="Logo" />
            <span className="sr-only">Virtual Pet Adoption Center</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/about">About</Link>
            <Link className="nav-link" to="/contact">Contact</Link>
            <Link className="nav-link" to="/adopt">Adopt Pets</Link>
            {isLoggedIn && <Link className="nav-link" to="/profile">Profile</Link>}
          </nav>

          {/* Auth & Hamburger Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            {!isLoggedIn ? (
              <button
                className="hidden md:inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
                onClick={handleLogin}
              >
                Login
              </button>
            ) : (
              <button
                className="hidden md:inline-flex rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

            {/* Hamburger Icon */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 text-gray-600 hover:text-black focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="mt-3 space-y-2 md:hidden">
            <Link className="block px-2 py-2 text-sm text-gray-700 hover:text-blue-600" to="/" onClick={toggleMenu}>Home</Link>
            <Link className="block px-2 py-2 text-sm text-gray-700 hover:text-blue-600" to="/about" onClick={toggleMenu}>About</Link>
            <Link className="block px-2 py-2 text-sm text-gray-700 hover:text-blue-600" to="/contact" onClick={toggleMenu}>Contact</Link>
            <Link className="block px-2 py-2 text-sm text-gray-700 hover:text-blue-600" to="/adopt" onClick={toggleMenu}>Adopt Pets</Link>
            {isLoggedIn && (
              <Link className="block px-2 py-2 text-sm text-gray-700 hover:text-blue-600" to="/profile" onClick={toggleMenu}>Profile</Link>
            )}
            {!isLoggedIn ? (
              <button
                className="w-full text-left px-2 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500"
                onClick={() => {
                  handleLogin();
                  toggleMenu();
                }}
              >
                Login
              </button>
            ) : (
              <button
                className="w-full text-left px-2 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700"
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
