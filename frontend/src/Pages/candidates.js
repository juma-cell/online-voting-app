import React, { useContext, useEffect, useState } from 'react';
import { VoteContext } from '../Context/VoteContext';

function Candidates() {
  const [candidatesData, setCandidatesData] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [userVoteId, setUserVoteId] = useState(null); // State to store user_vote ID
  const { addVote } = useContext(VoteContext);

  useEffect(() => {
    fetch('/candidates')
      .then((response) => response.json())
      .then((data) => setCandidatesData(data))
      .catch((error) => console.error('Error fetching candidates:', error));
  }, []);

  useEffect(() => {
    // Fetch the user_vote ID when the component mounts
    fetch('/user_votes')
      .then((response) => response.json())
      .then((data) => {
        setUserVoteId(data.id); // Store the user_vote ID in the state
        setHasVoted(!!data.id); // Update hasVoted based on whether the user_vote ID exists
      })
      .catch((error) => console.error('Error fetching user_vote ID:', error));
  }, []);

  const handleVote = () => {
    // Send the vote to the server
    fetch('/user_votes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ candidateId: selectedCandidateId, user_vote: userVoteId }), // Use 'user_vote' instead of 'userVoteId'
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response if necessary (e.g., show a success message)
        console.log('Vote submitted:', data);
        setHasVoted(true); // Update the state to indicate that the user has voted
        addVote(selectedCandidateId); // Call the addVote function to update the voting context
      })
      .catch((error) => console.error('Error submitting vote:', error));
  };

  return (
    <div>
      <h2 className="text-white">Candidates</h2>
      <div className="flex flex-wrap">
        {candidatesData.map((candidate) => (
          <div key={candidate.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-800">Name: {candidate.userName}</p>
              {/* Add other candidate information */}
              <p className="text-gray-800">Role: {candidate.role}</p>
              {hasVoted ? (
                <p>You have already voted for {candidate.userName}.</p>
              ) : (
                <button
                  onClick={() => setSelectedCandidateId(candidate.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Vote for {candidate.userName}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedCandidateId && !hasVoted && (
        <button
          onClick={handleVote}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Confirm Vote
        </button>
      )}
    </div>
  );
}

export default Candidates;
