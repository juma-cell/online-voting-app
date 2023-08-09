/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect, useState } from "react"
import { VoteContext } from "../Context/VoteContext"
import { AuthContext } from "../Context/AuthContext"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2"
import imageUrl from "../assets/check_mark.jpg"

function Candidates() {
  const [candidatesData, setCandidatesData] = useState([])
  const [current_user_vote, setCurrentUserVote] = useState([])
  const { id } = useParams()
  const nav = useNavigate()
  const location = useLocation()
  // console.log(location.state.user_vote_state[0])
  const [selectedCandidateId, setSelectedCandidateId] = useState(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [canSendVoted, setCanSendVote] = useState(false)
  const [firstVote, setFirstVote] = useState(false)
  const { BaseUrl } = useContext(VoteContext)
  const { current_user } = useContext(AuthContext)

  // useEffect(() => {
  //   fetch("/candidates")
  //     .then((response) => response.json())
  //     .then((data) => setCandidatesData(data))
  //     .catch((error) => console.error("Error fetching candidates:", error))
  // }, [])
  useEffect(() => {
    // console.log(location.state)
    setCurrentUserVote(location.state.user_vote_state)
    if (location.state.user_vote_state?.length === 0) {
      // setHasVoted(false)
      setFirstVote(true)
    } else {
      setHasVoted(true)
      setFirstVote(false)
      setSelectedCandidateId(location.state.user_vote_state[0].candidate_id)
    }
  }, [location.state])

  useEffect(() => {
    // /candidates/by_voting_event/:voting_event_id
    fetch(`${BaseUrl}/candidates/by_voting_event/${id}`)
      .then((res) => res.json())
      .then((EventCandidates) => {
        // console.log(EventCandidates)
        setCandidatesData(EventCandidates)
      })
  }, [BaseUrl, candidatesData?.length, id])

  const handleVote = (e, candidate_id, user_id, event_id) => {
    e.preventDefault()
    // Send the vote to the server
    // console.log(user_id)
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
        // Handle the response if necessary (e.g., show a success message)

        // console.log("Vote submitted:", data)
        setHasVoted(true) // Update the state to indicate that the user has voted
        setCanSendVote(false)
        // addVote(selectedCandidateId) // Call the addVote function to update the voting context
        // console.log("selected: ")
        // console.log(
        //   candidatesData.filter((obj) => obj.id === selectedCandidateId)[0]
        //     .userName
        // )
        // console.log(selectedCandidateId)

        nav(`/voting_events/${event_id}`)
        Swal.fire("Success", "vote submitted", "success")
      })
      .catch((error) => console.error("Error submitting vote:", error))
  }

  const handleVoteChange = (e, candidate_id, user_id, event_id, vote_id) => {
    e.preventDefault()
    // Send the vote to the server
    // console.log(user_id)
    fetch(`${BaseUrl}/user_votes/${vote_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate_id: candidate_id,
        user_id: user_id,
        voting_event_id: event_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response if necessary (e.g., show a success message)

        // console.log("Vote submitted:", data)
        setHasVoted(true) // Update the state to indicate that the user has voted
        setCanSendVote(false)
        // addVote(selectedCandidateId) // Call the addVote function to update the voting context
        // console.log("selected: ")
        // console.log(
        //   candidatesData.filter((obj) => obj.id === selectedCandidateId)[0]
        //     .userName
        // )
        // console.log(selectedCandidateId)

        nav(`/voting_events/${event_id}`)
        Swal.fire("Success", "vote submitted", "success")
      })
      .catch((error) => console.error("Error submitting vote:", error))
  }
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
              <p className="text-gray-800">
                <b>Name: {candidate.userName}</b>
              </p>
              {/* Add other candidate information */}
              <p className="text-gray-800">
                <b>Role: {candidate.role}</b>
              </p>
              {candidate.id === selectedCandidateId && hasVoted ? (
                // <p>
                //   {`You have voted for ${
                //     candidatesData.filter(
                //       (obj, index) => obj.id === selectedCandidateId
                //     )[0].userName
                //   }.`}

                <img
                  className="vote_check_mark"
                  src={imageUrl}
                  alt="My Image"
                  width={50}
                  height={50}
                ></img>
              ) : (
                // </p>
                <p>{`You can vote for`}</p>
              )}

              <button
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedCandidateId(candidate.id)
                  setCanSendVote(true)
                  // console.log(selectedCandidateId)
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Vote for {candidate.userName}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedCandidateId && canSendVoted && (
        <button
          onClick={(e) => {
            e.preventDefault()
            // console.log(firstVote)
            // console.log(current_user_vote)
            if (firstVote) {
              handleVote(e, selectedCandidateId, current_user.id, id)
            } else {
              handleVoteChange(
                e,
                selectedCandidateId,
                current_user.id,
                id,
                current_user_vote[0]?.id
              )
            }
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          {`Confirm Vote for ${
            candidatesData.filter(
              (obj, index) => obj.id === selectedCandidateId
            )[0]?.userName
          }`}
        </button>
      )}
    </div>
  )
}

export default Candidates
