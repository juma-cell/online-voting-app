import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const { current_user } = useContext(AuthContext);

  if (!current_user) {
    return <div>Loading...</div>; // You can show a loading indicator while waiting for the user data
  }

  // Define a style object to make the text white
  const whiteTextStyle = {
    color: "white",
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div style={whiteTextStyle}>
        <strong>First Name:</strong> {current_user.firstName}
      </div>
      <div style={whiteTextStyle}>
        <strong>Last Name:</strong> {current_user.lastName}
      </div>
      <div style={whiteTextStyle}>
        <strong>User Name:</strong> {current_user.userName}
      </div>
      <div style={whiteTextStyle}>
        <strong>Email:</strong> {current_user.email}
      </div>
      {/* You can add more user details here */}
    </div>
  );
};

export default Profile;
