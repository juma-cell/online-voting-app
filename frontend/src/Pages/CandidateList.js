import React, { useContext, useEffect, useState } from "react";
import { VoteContext } from "../Context/VoteContext";
import { AuthContext } from "../Context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Candidates() {
  const [candidatesData, setCandidatesData] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const { BaseUrl } = useContext(VoteContext);
  const { current_user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${BaseUrl}/candidates/by_voting_event/${id}`)
      .then((res) => res.json())
      .then((EventCandidates) => {
        console.log(EventCandidates);
        setCandidatesData(EventCandidates);
      });
  }, [BaseUrl, id]);

  const handleVote = (e, candidate_id, user_id, event_id) => {
    e.preventDefault();

    if (hasVoted && selectedCandidateId === candidate_id) {
      // If user has already voted for the same candidate, unselect
      setSelectedCandidateId(null);
      setHasVoted(false);
    } else {
      // Send the vote to the server
      fetch(`${BaseUrl}/user_votes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidate_id: candidate_id,
          user_id: user_id,
          voting_event_id: event_id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Vote submitted:", data);
          setSelectedCandidateId(candidate_id);
          setHasVoted(true);
          nav(`/voting_events/${event_id}`);
          Swal.fire("Success", "Vote submitted", "success");
        })
        .catch((error) => console.error("Error submitting vote:", error));
    }
  };

  return (
    <div>
      <h2 className="text-white">Candidates</h2>
      <div className="flex flex-wrap">
        {candidatesData.map((candidate, index) => (
          <div
            key={candidate.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-800">Name: {candidate.userName}</p>
              <p className="text-gray-800">Role: {candidate.role}</p>
              {hasVoted ? (
                candidate.id === selectedCandidateId ? (
                  <p>You have already voted for {candidate.userName}.</p>
                ) : (
                  <p>You have already voted.</p>
                )
              ) : (
                <button
                  onClick={(e) => handleVote(e, candidate.id, current_user.id, id)}
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    selectedCandidateId === candidate.id ? "opacity-50" : ""
                  }`}
                  disabled={selectedCandidateId !== null}
                >
                  Vote for {candidate.userName}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Candidates;
