import React from "react";
import IMG from "../assets/Vector (4).png";
import IMGG from "../assets/avatar.png";

function Profile() {
  return (
    <>
      <div className="w-full pt-10 ">
        <div className="md:flex justify-end">
          <div className="profileheader_titles text-white">Personal Info</div>
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
            <img
              src={IMGG}
              alt=""
              className="mx-auto w-[300px] mb-10"
            />
          </div>

          <div className="profile_button mx-auto">
            <button className="profile_button mx-auto text-white">
              Change Profile Picture
            </button>
          </div>

          <div className="flex mx-auto w-40 pt-10 text-center">
            <img src={IMG} alt="vector" className="pr-5" />
            <span className="my-auto text-white">Edit Profile</span>
          </div>
        </div>

        <div className="md:w-[50%]">
          <p>
            <span className="profile_title text-white">Name:</span>
            <br />
            <span className="text-white">{/* Add the name here */}</span>
          </p>

          <p className="mt-6">
            <span className="profile_title text-white">Email:</span>
            <br />
            <span className="text-white">{/* Add the email here */}</span>
          </p>

          <p className="mt-6">
            <span className="profile_title text-white">Aadhar Number:</span>
            <br />
            <span className="text-white">{/* Add the Aadhar number here */}</span>
          </p>

          <p className="mt-6">
            <span className="profile_title text-white">Address:</span>
            <br />
            <span className="text-white">XYZ, Street No. 92, Gurgaon, Uttar Pradesh, 100021</span>
          </p>

          <div className="mt-6 flex">
            <div className="w-[50%]">
              <span className="profile_title text-white">Eligible:</span>
              <br />
              <span className="text-white">True</span>
            </div>

            <div className="">
              <span className="profile_title text-white">Verified:</span>
              <br />
              <span className="text-white">True</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
