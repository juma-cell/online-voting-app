import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const VoteContext = createContext();

export default function VoteProvider({ children }) {
  const nav = useNavigate();
  const [votingEvents, setVotingEvents] = useState([]);
  const [onChange, setOnChange] = useState(true);

  const addEvent = (event_name, event_description, start_date, end_date) => {
    fetch("/voting_events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: event_name,
        event_description: event_description,
        start_date: start_date,
        end_date: end_date,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          Swal.fire("Error", response.message, "error");
        } else if (response.success) {
          Swal.fire("Success", response.message, "success");
          setOnChange(!onChange);
        } else {
          nav("/"); // Redirect to another page on success if needed
          Swal.fire("Success", response.message, "success");
        }
      });
  };

  const addVote = (option_id, event_id) => {
    fetch(`/voting_events/${event_id}/votes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        option_id: option_id,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          Swal.fire("Error", response.error, "error");
        } else if (response.success) {
          Swal.fire("Success", response.success, "success");
          setOnChange(!onChange);
        } else {
          nav("/"); // Redirect to another page on success if needed
          Swal.fire("Success", response.success, "success");
        }
      });
  };

  const deleteVoteEvent = (event_id) => {
    fetch(`/voting_events/${event_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          nav("/");
          Swal.fire("Success", response.success, "success");
          setOnChange(!onChange);
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      });
  };

  const fetchEvents = () => {
    fetch("/voting_events", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        setVotingEvents(response);
        console.log(response);
      });
  };

  const editEvent = (event_name, event_description, start_date, end_date, event_id) => {
    fetch(`/voting_events/${event_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_name: event_name,
        event_description: event_description,
        start_date: start_date,
        end_date: end_date,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          Swal.fire("Error", response.error, "error");
        } else if (response.success) {
          nav("/addVote");
          Swal.fire("Success", response.success, "success");
          setOnChange(!onChange);
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      });
  };

  useEffect(() => {
    fetchEvents();
  }, [onChange]);

  const contextData = {
    votingEvents,
    addVote,
    deleteVoteEvent,
    editEvent,
    addEvent,
  };

  return <VoteContext.Provider value={contextData}>{children}</VoteContext.Provider>;
}
