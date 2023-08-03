import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { VoteContext } from "../Context/VoteContext";

function AddCandidate() {
  const { current_user } = useContext(AuthContext);
  const { addCandidate, addEvent } = useContext(VoteContext);

  // Event state
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState(""); // Added event description state

  // Candidate state
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [user_vote_id, setUserVoteId] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (current_user && current_user.id) {
      // Add event
      const eventId = addEvent(eventName, eventDate, current_user.id, eventDescription); // Pass eventDescription here
      if (eventId) {
        // Add candidate
        addCandidate(role, userName, user_vote_id, eventId, current_user.id);
        console.log("Event and candidate added successfully.");
      } else {
        console.error("Failed to add event.");
      }
    } else {
      console.error("User ID is not available.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Add a New Candidate and Event</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Event details */}
          <div className="mb-4">
            <label htmlFor="eventName" className="block text-gray-700 font-bold mb-2">
              Event Name:
            </label>
            <input
              type="text"
              id="eventName"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventDate" className="block text-gray-700 font-bold mb-2">
              Event Date:
            </label>
            <input
              type="date"
              id="eventDate"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventDescription" className="block text-gray-700 font-bold mb-2">
              Event Description:
            </label>
            <textarea
              id="eventDescription"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Event Description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </div>

          {/* Candidate details */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
              Role:
            </label>
            <input
              type="text"
              id="role"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">
              User Name:
            </label>
            <input
              type="text"
              id="userName"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="user_vote_id" className="block text-gray-700 font-bold mb-2">
              User Vote ID:
            </label>
            <input
              type="text"
              id="user_vote_id"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter User Vote ID"
              value={user_vote_id}
              onChange={(e) => setUserVoteId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
          >
            Add Candidate and Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCandidate;
