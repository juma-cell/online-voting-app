
import React from "react";
import IMG from "../assets/Vector (4).png";
import IMGG from "../assets/avatar.png";
function Profile() {
  return (
    <>
      <div className="w-full pt-10 ">
        <div className=" md:flex justify-end">
          <div className="profileheader_titles">Personal Info</div>
          <div className="profileheader_titles">Elections</div>
          <div className="profileheader_titles">Contact</div>
          <div className="profileheader_titles">
            <button className="signup_button">Vote</button>
          </div>
        </div>
      </div>


      <div className=" md:flex mx-auto p-20">
        <div className="md:w-[50%]">
          <div>
            <img
              src={IMGG}
              alt=""
              className="mx-auto w-[300px] mb-10"
            />
          </div>

          <div className="profile_button mx-auto">
            <button className="profile_button mx-auto">
              Change Profile Picture
            </button>
          </div>

          <div className="flex mx-auto w-40 pt-10 text-center">
            <img src={IMG} alt="vector" className="pr-5" />
            <span className="my-auto">Edit Profile</span>
          </div>
        </div>

        <div className="md:w-[50%]">
          <p>
            <span className="profile_title">Name:</span>
            <br />
            
          </p>


          <p className="mt-6">
            <span className="profile_title">Email:</span>
            <br />
         
          </p>

          <p className="mt-6">
            <span className="profile_title">Aadher Number:</span>
            <br />
            
          </p>

          <p className="mt-6">
            <span className="profile_title">Address:</span>
            <br />
            XYZ, Street No. 92, Gurgaon, Uttar Pardesh, 100021
          </p>

          <div className="mt-6 flex">
            <div className="w-[50%]">
              <span className="profile_title">Eligible:</span>
              <br />
              True
            </div>

            <div className="">
              <span className="profile_title">Verified:</span>
              <br />
              True
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;