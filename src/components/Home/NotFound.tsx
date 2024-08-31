// src/pages/NotFound.js
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-lg">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
