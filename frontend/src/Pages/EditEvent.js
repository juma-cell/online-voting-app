import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "../Context/AuthContext"
import { VoteContext } from "../Context/VoteContext"
import Swal from "sweetalert2"
import { useNavigate, useParams } from "react-router-dom"

function EditEvent() {
  const { current_user } = useContext(AuthContext)
  const { BaseUrl, editEventB } = useContext(VoteContext)
  const nav = useNavigate()
  // const [onChange, setOnChange] = useState(true)

  const [eventName, setEventName] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventOption, setEventOption] = useState({})
  const [currentOptions, setCurrentOptions] = useState([])
  const [duration, setDuration] = useState("")
  const [showOptionInput, setShowOptionInput] = useState(false)
  const { id } = useParams()
  const [editListState, setEditListState] = useState()
  let EditList = []
  // const { current_user } = useContext(AuthContext)

  // const [SingleEvent, setSingleEvent] = useState([])
  // const [votesForEvent, setVotesForEvent] = useState([])
  // const [candidatesData, setCandidatesData] = useState([])
  // const [newEventId, setNewEventId] = useState(null)
  function toggleValueInList(value, list) {
    const index = list.indexOf(value)

    if (index !== -1) {
      // Value is in the list, remove it
      list.splice(index, 1)
      // setEditListState(list)
    } else {
      // Value is not in the list, add it
      list.push(value)
      // setEditListState(list)
    }

    return list
  }

  function removeItemById(list, idToRemove) {
    return list.reduce((accumulator, item) => {
      if (item.id !== idToRemove) {
        accumulator.push(item)
      }
      return accumulator
    }, [])
  }

  useEffect(() => {
    fetch(`${BaseUrl}/voting_events/${id}`)
      .then((res) => res.json())
      .then((SingleEvent) => {
        console.log(SingleEvent)
        setEventName(SingleEvent?.eventsName)
        setEventDescription(SingleEvent?.eventsDescription)
        setEventDate(SingleEvent?.eventDate)
        setDuration(SingleEvent?.duration)
      })
  }, [BaseUrl, id])

  // useEffect(() => {
  //   fetch(`${BaseUrl}/user_votes/by_event_id/${id}`)
  //     .then((res) => res.json())
  //     .then((SingleEventVotes) => {
  //       console.log(SingleEventVotes)
  //       setVotesForEvent(SingleEventVotes)
  //     })
  // }, [BaseUrl, id])

  useEffect(() => {
    // /candidates/by_voting_event/:voting_event_id
    fetch(`${BaseUrl}/candidates/by_voting_event/${id}`)
      .then((res) => res.json())
      .then((EventCandidates) => {
        console.log(EventCandidates)
        console.log(currentOptions)
        setCurrentOptions(EventCandidates)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BaseUrl, currentOptions?.length, id])

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (current_user && current_user.id) {
      const eventId = await editEventB(
        eventName,
        duration,
        eventDescription,
        eventDate,
        current_user.id,
        id
      ) // Pass eventDescription here

      if (eventId) {
        // Add candidate
        console.log(eventId)
        // eslint-disable-next-line array-callback-return
        // currentOptions.forEach(async (candidate) => {
        //   await fetch(`${BaseUrl}/candidates`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       role: candidate.role,
        //       userName: candidate.userName,
        //       voting_event_id: eventId.id,
        //       user_id: current_user.id,
        //     }),
        //   })
        //   setTimeout(() => {
        //     console.log("Delayed for 1 second.")
        //   }, 1000 * currentOptions.length)
        // })

        // console.log(res)

        // Swal.fire(
        //   "Success",
        //   "Event and candidate added successfully",
        //   "success"
        // )
        // setOnChange(!onChange)
        console.log("Event and candidate added successfully.")

        async function sendApiRequest(element, eventId, current_user_id) {
          console.log(element)
          try {
            const response = await fetch(
              `${BaseUrl}/candidates/${element.id}`,
              {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  role: element.role,
                  userName: element.userName,
                  voting_event_id: eventId,
                  user_id: current_user_id,
                }),
              }
            )
            if (!response.ok) {
              throw new Error(`API request failed for ${element}`)
            }
            const data = await response.json()
            console.log(`API response for ${element}:`, data)
          } catch (error) {
            console.error(`Error sending API request for ${element}:`, error)
          }
        }

        async function sendApiRequestsForElements() {
          for (const element of currentOptions) {
            await sendApiRequest(element, eventId.id, current_user.id)
          }
        }

        sendApiRequestsForElements()

        nav("/") // Redirect to another page on success if needed
        Swal.fire(
          "Success",
          "Event and Candidates Updated successfully",
          "success"
        )
      } else {
        console.error("Failed to add event.")
        // Swal.fire("Error", eventId.error, "error")
        // setOnChange(!onChange)
      }
    } else {
      console.error("User ID is not available.")
    }
  }

  const handleAddOption = (e) => {
    e.preventDefault()
    if (showOptionInput) {
      setShowOptionInput(false)
    } else {
      setShowOptionInput(true)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Edit an Event</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="eventName"
              className="block text-gray-700 font-bold mb-2"
            >
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
            <label
              htmlFor="eventDate"
              className="block text-gray-700 font-bold mb-2"
            >
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
            <label
              htmlFor="eventDescription"
              className="block text-gray-700 font-bold mb-2"
            >
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
            <button
              type="text"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
              onClick={handleAddOption}
            >
              Add Candidate Option
            </button>
            {showOptionInput === true ? (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="eventOption"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Candidate Name:
                  </label>
                  <textarea
                    id="eventOption"
                    name="userName"
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                    placeholder="Enter Candidate Name"
                    value={eventOption.userName || ""}
                    onChange={(e) => {
                      e.preventDefault()
                      setEventOption({
                        ...eventOption,
                        userName: e.target.value,
                      })
                    }}
                  />
                </div>

                {/* Candidate details */}
                <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Role:
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                    placeholder="Enter Role"
                    value={eventOption.role || ""}
                    onChange={(e) => {
                      e.preventDefault()
                      setEventOption({
                        ...eventOption,
                        role: e.target.value,
                      })
                    }}
                  />
                </div>
                <button
                  type="text"
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-600"
                  onClick={(e) => {
                    e.preventDefault()
                    console.log("before")
                    console.log(eventOption)
                    console.log(currentOptions)
                    try {
                      fetch(`${BaseUrl}/candidates`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          role: eventOption.role,
                          userName: eventOption.userName,
                          voting_event_id: id,
                          user_id: current_user.id,
                        }),
                      })
                    } catch (e) {
                      console.log(e)
                    }
                    setCurrentOptions([...currentOptions, eventOption])
                    setShowOptionInput(false)
                    setEventOption("")
                    // console.log(currentOptions)
                    console.log("After")
                    console.log(eventOption)
                    console.log(currentOptions)
                  }}
                >
                  Add Option
                </button>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="mb-4">
            {currentOptions.length === 0 ? (
              ""
            ) : (
              <>
                <table>
                  <tbody>
                    <tr>
                      <th>No. </th>
                      <th>Name</th>
                      <th>Role</th>
                    </tr>
                    {currentOptions.map((el, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          {EditList.includes(index) ? (
                            <td>
                              <input
                                type="text"
                                name={currentOptions[index].userName}
                                value={currentOptions[index].userName}
                                onChange={(e) => {
                                  // e.preventDefault()
                                  setCurrentOptions((prevData) => ({
                                    ...prevData,
                                    userName: e.target.value,
                                  }))
                                }}
                                onFocus={true}
                              />
                            </td>
                          ) : (
                            <td>{currentOptions[index].userName}</td>
                          )}
                          {EditList.includes(index) ? (
                            <td>
                              <input
                                type="text"
                                value={currentOptions[index].role}
                                onChange={(e) => {
                                  // e.preventDefault()
                                  setCurrentOptions((prevData) => ({
                                    ...prevData,
                                    role: e.target.value,
                                  }))
                                }}
                              ></input>
                            </td>
                          ) : (
                            <td>{currentOptions[index].role}</td>
                          )}
                          <td>
                            {/* <button
                              className="mr-2 bg-green-400 px-4 py-1 rounded-full"
                              onClick={(e) => {
                                e.preventDefault()
                                console.log(EditList)
                                toggleValueInList(index, EditList)
                                console.log(EditList)
                                console.log(EditList.includes(0))
                              }}
                            >
                              Edit
                            </button> */}
                          </td>
                          <td>
                            <button
                              className="mr-2 bg-red-400 px-4 py-1 rounded-full"
                              onClick={(e) => {
                                e.preventDefault()
                                // list.filter((item) => item.id !== idToRemove)

                                async function deleteCandidateApiRequest(
                                  element,
                                  eventId,
                                  current_user_id
                                ) {
                                  console.log(element)
                                  try {
                                    const response = await fetch(
                                      `${BaseUrl}/candidates/${element.id}`,
                                      {
                                        method: "DELETE",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        // body: JSON.stringify({
                                        //   role: element.role,
                                        //   userName: element.userName,
                                        //   voting_event_id: eventId,
                                        //   user_id: current_user_id,
                                        // }),
                                      }
                                    )
                                    if (!response.ok) {
                                      throw new Error(
                                        `API request failed for ${element}`
                                      )
                                    }
                                    const data = await response.json()
                                    console.log(
                                      `API response for ${element}:`,
                                      data
                                    )
                                  } catch (error) {
                                    console.error(
                                      `Error sending API request for ${element}:`,
                                      error
                                    )
                                  }
                                }

                                deleteCandidateApiRequest(
                                  el,
                                  id,
                                  current_user.id
                                )

                                const NewList = currentOptions
                                console.log(NewList)
                                console.log("clicked")
                                console.log(index)
                                console.log(currentOptions)
                                const idToRemove = currentOptions[index].id
                                console.log(idToRemove)
                                const updatedList = removeItemById(
                                  NewList,
                                  idToRemove
                                )
                                console.log(updatedList)
                                setCurrentOptions(updatedList)
                                console.log(currentOptions)
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 font-bold mb-2"
            >
              Duration:
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Event duration in hours"
              value={duration || ""}
              onChange={(e) => {
                e.preventDefault()
                setDuration(e.target.value)
              }}
            />
          </div>
          <button
            type="text"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
            onClick={handleEditSubmit}
          >
            Edit Event
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditEvent
