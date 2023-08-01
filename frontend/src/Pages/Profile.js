import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import image3 from '../assets/image3.png';

export default function Profile() {
  const { current_user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const handleEdit = () => {
    setEditedUser({ ...current_user });
    setEditing(true);
  };

  const handleSave = () => {
    // Implement your save logic here, e.g., API call to update user data
    // After saving, you can update the current_user in the AuthContext if needed
    // For now, we'll just toggle back to viewing mode
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div>
      {current_user && current_user.email ? (
        <div>
          <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  {editing ? (
                    <input
                      type="text"
                      name="email"
                      value={current_user.email} // Show the current email and disable editing
                      disabled
                      className="bg-gray-300 text-black"
                    />
                  ) : (
                    current_user.email
                  )}
                </h3>

                <div className="mt-4">
                  {editing ? (
                    <div>
                      <label className="block text-white font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={editedUser.first_name || ''}
                        onChange={handleChange}
                        className="bg-white text-black"
                      />
                    </div>
                  ) : (
                    <p className="text-white">
                      First Name: {current_user.first_name}
                    </p>
                  )}

                  {editing ? (
                    <div>
                      <label className="block text-white font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={editedUser.last_name || ''}
                        onChange={handleChange}
                        className="bg-white text-black"
                      />
                    </div>
                  ) : (
                    <p className="text-white">
                      Last Name: {current_user.last_name}
                    </p>
                  )}

                  {editing ? (
                    <div>
                      <label className="block text-white font-medium">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="new_password"
                        value={editedUser.new_password || ''}
                        onChange={handleChange}
                        className="bg-white text-black"
                      />
                    </div>
                  ) : (
                    <p className="text-white">Password: ********</p>
                  )}
                </div>
              </div>

              <div className="hidden sm:block sm:shrink-0">
                <img
                  alt="Paul Clapton"
                  src={image3}
                  className="h-16 w-16 rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>

            <div className="mt-4">
              {editing ? (
                <button
                  onClick={handleSave}
                  className="bg-white text-black px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-white text-black px-4 py-2 rounded-lg"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white text-center">
          LOGIN TO VIEW THIS PAGE PLEASE
        </p>
      )}
    </div>
  );
}
