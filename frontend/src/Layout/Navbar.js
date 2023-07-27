import React from 'react';
import image1 from '../assets/image1.png';

function Navbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <img src={image1} className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Online-Voting</span>
        </a>
        <div className="space-x-4">
          <a href="#" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">Home</a>
          <a href="#" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">Services</a>
          <a href="#" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">Pricing</a>
          <a href="#" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
