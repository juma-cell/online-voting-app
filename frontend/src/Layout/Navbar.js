import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/image1.png';

function Navbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <img src={image1} className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Online-Voting</span>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">Home</Link>
          <Link to="/login" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">Login</Link>
          <Link to="/signup" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">Signup</Link>
          <Link to="/profile" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">Profile</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

