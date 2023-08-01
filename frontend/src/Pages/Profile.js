import React, { useState } from "react";
import IMG from "../assets/Vector (4).png";
import IMGG from "../assets/avatar.png";

function Profile() {
  // Example user data (replace with data fetched from your backend)
  const initialUserData = {
    name: "John Doe",
    email: "johndoe@example.com",
    aadharNumber: "1234-5678-9012",
    address: "XYZ, Street No. 92, Gurgaon, Uttar Pradesh, 100021",
    eligible: true,
    verified: true,
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle profile update
  const handleProfileUpdate = (updatedData) => {
    // Send updatedData to your backend to save changes
    // For simplicity, we will just update the state here
    setUserData(updatedData);
    setIsEditing(false); // Close the edit form
  };

  return (
    <>
      <div className="w-full pt-10">
        <div className="md:flex justify-end">
          <div className="profileheader_titles text-white">Elections</div>
          <div className="profileheader_titles text-white">Contact</div>
          <div className="profileheader_titles">
            <button className="signup_button">Vote</button>
          </div>
        </div>
      </div>

      <div className="md:flex mx-auto p-20">
        <div className="md:w-[50%]">
          <div>
            <img src={IMGG} alt="" className="mx-auto w-[300px] mb-10" />
          </div>

          {isEditing ? (
            <div className="profile_button mx-auto">
              {/* Edit Profile Form */}
              <div>
                <label className="text-white">Name:</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="text-white">Email:</label>
                <input
                  type="text"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>

              <button
                className="profile_button mx-auto text-white"
                onClick={() => handleProfileUpdate(userData)}
              >
                Save Changes
              </button>

              <button
                className="profile_button mx-auto text-white"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex mx-auto w-40 pt-10 text-center">
              <img src={IMG} alt="vector" className="pr-5" />
              <span className="my-auto text-white" onClick={() => setIsEditing(true)}>
                Edit Profile
              </span>
            </div>
          )}
        </div>

        <div className="md:w-[50%]">
          <p>
            <span className="profile_title text-white">Name:</span>
            <br />
            <span className="text-white">{userData.name}</span>
          </p>

          <p className="mt-6">
            <span className="profile_title text-white">Email:</span>
            <br />
            <span className="text-white">{userData.email}</span>
          </p>

          <div className="mt-6 flex">
            <div className="w-[50%]">
              <span className="profile_title text-white">Eligible:</span>
              <br />
              <span className="text-white">{userData.eligible ? "True" : "False"}</span>
            </div>

            <div className="">
              <span className="profile_title text-white">Verified:</span>
              <br />
              <span className="text-white">{userData.verified ? "True" : "False"}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

