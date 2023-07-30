import React from "react"
import image2 from "../assets/image2.png"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="dark:bg-gray-900 m-0 p-4 md:py-8 bottom-0 left-0 w-full">
      <div className="w-full mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <img src={image2} className="h-8 mr-3" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Voting
            </span>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link
                to="/profile"
                className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
              >
                Profile
              </Link>
            </li>

            <li>
              <div className="mr-4 hover:underline md:mr-6">Privacy Policy</div>
            </li>
            <li>
              <div className="mr-4 hover:underline md:mr-6">Licensing</div>
            </li>
            <li>
              <div className="hover:underline">Contact</div>
            </li>
          </ul>
        </div>
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            d
          </a>
          . All Rights Reserved.
        </span>
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            d
          </a>
          . All Rights Reserved.
        </span>
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            d
          </a>
          . All Rights Reserved.
        </span>
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            d
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
