import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { VoteContext } from '../Context/VoteContext';

function AddEvent() {

  const { current_user } = useContext(AuthContext);
  const { addEvent } = useContext(VoteContext);

  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (current_user && current_user.id) {
      addEvent(eventName, eventDescription, duration, current_user.id);
    } else {
      // Handle the case when current_user or current_user.id is not available.
      console.error("User ID is not available.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Add a New Event</h2>
        <form on onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <label htmlFor="eventDescription" className="block text-gray-700 font-bold mb-2">
              Duration:
            </label>
            <textarea
              id="duration"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter the duration in hours"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;