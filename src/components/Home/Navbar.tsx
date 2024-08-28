import { useState } from "react";
import {
  FaBars,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaTimes,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { setLogout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);

  const handleLogOut = () => {
    dispatch(setLogout());
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 relative">
      <div className="container mx-auto flex justify-between items-center p-2 text-sm">
        <div className="flex items-center space-x-2">
          <span>Follow our social media:</span>
          <a href="#" aria-label="Facebook">
            <FaFacebook className="h-5 w-5 text-blue-600" />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram className="h-5 w-5 text-blue-600" />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter className="h-5 w-5 text-blue-600" />
          </a>
          <a href="#" aria-label="YouTube">
            <FaYoutube className="h-5 w-5 text-blue-600" />
          </a>
        </div>
        <div className="md:flex hidden items-center space-x-4">
          <a
            href="mailto:support@yourdomain.tld"
            className="flex items-center space-x-1"
          >
            <FaEnvelope className="h-4 w-4 text-blue-600" />
            <span>sportedge@gmail.com</span>
          </a>
          <div className="md:flex hidden items-center space-x-1">
            <FaMapMarkerAlt className="h-4 w-4 text-blue-600" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center p-4">
        <Link
          to="/"
          className={`flex items-center space-x-2 ${
            isMenuOpen ? "hidden" : "block"
          }`}
        >
          <span className="text-3xl font-bold text-blue-600">
            <h1>
              Sport <span className="text-orange-600">Ease</span>
            </h1>
          </span>
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6 text-blue-600" />
            ) : (
              <FaBars className="h-6 w-6 text-blue-600" />
            )}
          </button>
        </div>

        <div
          className={`fixed top-0 left-0 w-full h-full bg-white z-50 p-8 transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:static md:w-auto md:bg-transparent md:p-0 md:transform-none md:flex md:items-center md:space-x-8`}
        >
          {isMenuOpen && (
            <button
              className="absolute top-4 right-4 md:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close Menu"
            >
              <FaTimes className="h-6 w-6 text-blue-600" />
            </button>
          )}

          <Link
            to="/"
            className={`block md:inline-block font-bold py-2 ${
              isActive("/")
                ? "text-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block md:inline-block font-bold py-2 ${
              isActive("/about")
                ? "text-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`}
          >
            About Us
          </Link>
          <div className="relative group block md:inline-block py-2">
            <Link
              to="/facilities"
              className={`text-gray-800 font-bold flex items-center ${
                isActive("/facilities")
                  ? "text-blue-600"
                  : "hover:text-blue-600"
              }`}
            >
              Facilities
            </Link>
          </div>
          <Link
            to="/contact"
            className={`block md:inline-block font-bold py-2 ${
              isActive("/contact")
                ? "text-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`}
          >
            Contact Us
          </Link>
          <div className="relative group block md:inline-block py-2">
            <Link
              to="/pages"
              className={`text-gray-800 font-bold flex items-center ${
                isActive("/pages") ? "text-blue-600" : "hover:text-blue-600"
              }`}
            >
              Pages
            </Link>
          </div>

          <div className="mt-4 md:mt-0">
            {user ? (
              <button
                onClick={handleLogOut}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold block text-center"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold block text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
