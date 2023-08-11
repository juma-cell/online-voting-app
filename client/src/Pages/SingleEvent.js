import React, { useState, useEffect, useContext } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { AuthContext } from "../Context/AuthContext"
import { VoteContext } from "../Context/VoteContext"
import PieChart2 from "../components/PieChart2"

function SingleEvent() {
  const { id } = useParams()
  const nav = useNavigate()
  const { current_user } = useContext(AuthContext)
  const { deleteVoteEvent, BaseUrl } = useContext(VoteContext)
  const [SingleEvent, setSingleEvent] = useState([])
  const [votesForEvent, setVotesForEvent] = useState([])
  const [candidatesData, setCandidatesData] = useState([])
  const vote_count = []

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVoteEvent(current_user.id, id)
        Swal.fire("Deleted!", "Your event has been deleted.", "success")
      }
    })
  }

  useEffect(() => {
    fetch(`${BaseUrl}/voting_events/${id}`)
      .then((res) => res.json())
      .then((SingleEvent) => {
        console.log(SingleEvent)
        setSingleEvent(SingleEvent)
      })
  }, [BaseUrl, id])

  useEffect(() => {
    fetch(`${BaseUrl}/user_votes/by_event_id/${id}`)
      .then((res) => res.json())
      .then((SingleEventVotes) => {
        console.log(SingleEventVotes)
        setVotesForEvent(SingleEventVotes)
      })
  }, [BaseUrl, id])

  useEffect(() => {
    fetch(`${BaseUrl}/candidates/by_voting_event/${id}`)
      .then((res) => res.json())
      .then((EventCandidates) => {
        console.log(EventCandidates)
        setCandidatesData(EventCandidates)
      })
  }, [BaseUrl, candidatesData?.length, id])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">
            {SingleEvent && SingleEvent.eventsName}
          </h3>
          <p className="text--700 mb-4">
            {SingleEvent && SingleEvent.eventsDescription}
          </p>
          <p className="text--700 mb-4">
            {`Event Date: ${SingleEvent && SingleEvent.eventDate}`}
          </p>
          <p className="text--700 mb-4">
            {`Event Duration: ${SingleEvent && SingleEvent.duration} hrs`}
          </p>
          <b>
            <h4>Vote Count: {votesForEvent?.length}</h4>
          </b>
          <hr />
          <b>
            <p>Candidates Vote Count</p>
          </b>
          <div className="flex items-center text-gray-500 text-sm"></div>
          {candidatesData.map((candidate, index) => {
            vote_count.push({
              name: candidatesData[index].userName,
              value: votesForEvent.filter(
                (obj) => obj.candidate_id === candidate.id
              ).length,
            })
            console.log(vote_count)
            return (
              <div key={index}>
                <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden dark:bg-gray-700">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-white">
                      {candidate.userName}
                    </div>
                    <p className="text-gray-700 text-base text-red-200">
                      Votes: {votesForEvent.filter(
                        (obj) => obj.candidate_id === candidate.id
                      ).length}
                    </p>
                  </div>
                </div>
                <br />
              </div>
            )
          })}
          <div>
            <PieChart2 data={vote_count} />
          </div>
          <div>
            {current_user && current_user.id === SingleEvent.user_id ? (
              <>
                <div className="flex mt-4">
                  <Link
                    to={`/voting_events/edit/${id}`}
                    className="mr-2 bg-gray-200 px-4 py-1 rounded-full"
                  >
                    Edit
                  </Link>
                  <button
                    to={`/candidates/${id}`}
                    className="bg-blue-800 text-white px-4 py-2 rounded-full"
                    onClick={(e) => {
                      e.preventDefault()
                      const userVoteresults = votesForEvent.filter(
                        (item) => item.user_id === current_user.id
                      )
                      console.log(userVoteresults)
                      nav(`/candidates/${id}`, {
                        state: { user_vote_state: userVoteresults },
                      })
                    }}
                  >
                    Vote for Candidates
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-200 px-4 py-1 rounded-full"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <button
                to={`/candidates/${id}`}
                className="bg-blue-800 text-white px-4 py-2 rounded-full"
                onClick={(e) => {
                  e.preventDefault()
                  const userVoteresults = votesForEvent.filter(
                    (item) => item.user_id === current_user.id
                  )
                  console.log(userVoteresults)
                  nav(`/candidates/${id}`, {
                    state: { user_vote_state: userVoteresults },
                  })
                }}
              >
                Vote for Candidates
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleEvent
