
import React from 'react';

function Profile() {
  // Fetch user profile data from the backend and use state to display it
  const user = {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    profile_picture_url: 'https://example.com/profile.jpg',
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <img src={user.profile_picture_url} alt="Profile" />
        <h3>{user.username}</h3>
        <p>Email: {user.email}</p>
        {/* Allow for updating profile picture, username, etc. */}
      </div>
    </div>
  );
}

export default Profile;
