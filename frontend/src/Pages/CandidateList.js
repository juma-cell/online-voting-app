import React, { useState } from 'react';

function CandidateList({ event, selectedCandidate, setSelectedCandidate, vote }) {
  const handleCandidateSelection = (candidateId) => {
    setSelectedCandidate(candidateId);
  };

  const handleVote = () => {
    if (selectedCandidate !== null) {
      vote(selectedCandidate);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-blue-800 mb-2 uppercase text-center">{event.eventsName}</h2>
      <p className="text-lg text-green-400 mb-4">{event.eventsDescription}</p>

      <h3 className="text-lg font-semibold mb-2">Candidates:</h3>
      <ul>
        {event.candidates.map((candidate) => (
          <li key={candidate.id}>
            <label>
              <input
                type="radio"
                name="candidate"
                value={candidate.id}
                checked={selectedCandidate === candidate.id}
                onChange={() => handleCandidateSelection(candidate.id)}
              />
              {candidate.name}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleVote}>Vote</button>
    </div>
  );
}

export default CandidateList;
