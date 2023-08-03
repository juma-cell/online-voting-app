import React, { useEffect, useState } from 'react';

function Candidates() {
  const [candidatesData, setCandidatesData] = useState([]);

  useEffect(() => {
    fetch('/candidates')
      .then((response) => response.json())
      .then((data) => setCandidatesData(data))
      .catch((error) => console.error('Error fetching candidates:', error));
  }, []);

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Candidates;

