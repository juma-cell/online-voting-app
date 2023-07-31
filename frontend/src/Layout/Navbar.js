import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/image1.png';
import { AuthContext } from '../Context/AuthContext';

function Navbar() {
  const { signout } = useContext(AuthContext);

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
         <Link to="/addevent" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">Add Event</Link>

        </div>
         <div><button
                    onClick={signout}
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Log out
                  </button> </div>
                 
                
      </div>
    </nav>
  );
}

export default Navbar;

