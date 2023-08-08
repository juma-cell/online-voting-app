import React, { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { AuthContext } from "../Context/AuthContext"
import { VoteContext } from "../Context/VoteContext"

function SingleEvent() {
  const { id } = useParams()
  const { current_user } = useContext(AuthContext)
  const { deleteVoteEvent, addFeedback, BaseUrl } = useContext(VoteContext)
  const [feedback, setfeedback] = useState("")
  const [SingleEvent, setSingleEvent] = useState([])
  const [votesForEvent, setVotesForEvent] = useState([])
  const [candidatesData, setCandidatesData] = useState([])

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

  const handleSubmit = () => {
    addFeedback(feedback, id)
    console.log("submit")
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
    fetch(`${BaseUrl}/feedback`)  
      .then((res) => res.json())
      .then((EventFeedback) => {
        console.log(EventFeedback);
        setfeedback(EventFeedback);
      });
  }, [BaseUrl, id]);


  useEffect(() => {
    fetch(`${BaseUrl}/user_votes/by_event_id/${id}`)
      .then((res) => res.json())
      .then((SingleEventVotes) => {
        console.log(SingleEventVotes)
        setVotesForEvent(SingleEventVotes)
      })
  }, [BaseUrl, id])

  useEffect(() => {
    // /candidates/by_voting_event/:voting_event_id
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
            {`
            Event Duration: 
            ${SingleEvent && SingleEvent.duration} hrs`}
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
            return (
              <>
                <div
                  className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden dark:bg-gray-700"
                  key={index}
                >
                  {/* container mx-auto min-h-[85vh] bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 */}
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-white">
                      {candidate.userName}
                    </div>
                    <p className="text-gray-700 text-base text-red-200">
                      Votes:{" "}
                      {
                        // votesForEvent.filter(
                        //   (obj) => obj.candidate_id === candidate.id
                        // ).length
                        votesForEvent.filter(
                          (obj) => obj.candidate_id === candidate.id
                        ).length
                      }
                    </p>
                  </div>
                </div>
                <br />
              </>
            )
          })}
          <div>
            {current_user && current_user.id === SingleEvent.user_id ? (
              <>
                <div className="flex mt-4">
                  <Link
                    to={`/editEvent/${id}`}
                    className="mr-2 bg-gray-200 px-4 py-1 rounded-full"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="bg-red-200 px-4 py-1 rounded-full"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        {current_user && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-4">
            <h4 className="text-lg font-bold mb-4">Feedback</h4>

            {SingleEvent.feedback && SingleEvent.feedback.length === 0 ? (
              <p>No feedback yet.</p>
            ) : (
              SingleEvent.feedback &&
              SingleEvent.feedback.map((feedback) => (
                <div key={feedback.id} className="flex mb-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700">
                      {feedback.user_id}
                    </div>
                    <p className="text-gray-700">{feedback.feedback_content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {current_user && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-6 mb-4"
          >
            <h4 className="text-lg font-bold mb-4">Add Feedback</h4>
            <div className="flex mb-4">
              <input
                type="text"
                value={feedback}
                onChange={(e) => setfeedback(e.target.value)}
                className="mr-2 px-4 py-1 rounded-full border"
                placeholder="Enter your feedback..."
              />
              <button className="bg-gray-200 px-4 py-1 rounded-full">
                Add Feedback
              </button>
            </div>
          </form>
        )}

        <div>
          <Link
            to={`/candidates/${id}`}
            className="bg-blue-800 text-white px-4 py-2 rounded-full"
          >
            Vote for Candidates
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SingleEvent
