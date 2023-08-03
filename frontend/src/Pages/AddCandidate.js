import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { VoteContext } from '../Context/VoteContext';

function AddCandidate() {
  const { current_user } = useContext(AuthContext);
  const {addCandidate} = useContext(VoteContext);

  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');
  const [user_vote_id, setUserVoteId] = useState('');
  const [voting_event_id, setVotingEventId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (current_user && current_user.id) {
      addCandidate(role, userName, user_vote_id, voting_event_id, current_user.id);
    } else {
      console.error("User ID is not available.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Add a New Candidate</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <label htmlFor="voting_event_id" className="block text-gray-700 font-bold mb-2">
              Voting Event ID:
            </label>
            <input
              type="text"
              id="voting_event_id"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Voting Event ID"
              value={voting_event_id}
              onChange={(e) => setVotingEventId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
          >
            Add Candidate
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCandidate;
