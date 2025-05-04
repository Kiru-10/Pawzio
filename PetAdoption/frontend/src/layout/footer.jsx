import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import pawzio from '../assets/pawzio.png';

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <footer
      className="mt-12 border-t border-gray-200 bg-white py-8 text-sm text-gray-600"
      data-aos="fade-up"
    >
      <div className="mx-auto max-w-screen-lg px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 text-center md:text-left">
          {/* Logo & Name */}
          <div className="mb-4 md:mb-0 flex items-center gap-2">
            <img
              className="h-8 w-auto"
              src={pawzio}
              alt="Logo"
            />
            <span className="font-semibold text-gray-800 text-base">
              Pawzio
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link className="hover:text-gray-900 transition" to="/">Home</Link>
            <Link className="hover:text-gray-900 transition" to="/about">About</Link>
            <Link className="hover:text-gray-900 transition" to="/contact">Contact</Link>
            <Link className="hover:text-gray-900 transition" to="/adopt">Adopt Pets</Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Pawzio. All rights reserved.
          </p>

          {/* Social Media Icons from Flaticon */}
          <div className="flex gap-4 justify-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:opacity-80 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                alt="Facebook"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:opacity-80 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="Twitter"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-80 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                alt="Instagram"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:opacity-80 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                alt="YouTube"
                className="h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
