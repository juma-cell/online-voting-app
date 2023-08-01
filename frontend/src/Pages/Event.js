import React, { useEffect } from 'react';
import { useVoteContext } from '../VoteContext';

function Event() {
  const { votingEvents, fetchVotingEvents } = useVoteContext();

  useEffect(() => {
    // Fetch the voting events when the component mounts
    fetchVotingEvents();
  }, [fetchVotingEvents]);

  // Function to calculate the duration based on start and end dates
  const calculateDuration = (start, end) => {
    const startDatetime = new Date(start);
    const endDatetime = new Date(end);
    const durationInMilliseconds = endDatetime - startDatetime;
    const days = durationInMilliseconds / (1000 * 60 * 60 * 24); // Milliseconds to days conversion
    return `${days} days`;
  };

  return (
    <div>
      <h1>Voting Events</h1>
      {votingEvents.map((event) => (
        <div key={event.event_id}>
          <h2>{event.event_name}</h2>
          <p>{event.event_description}</p>
          <p>Duration: {calculateDuration(event.start_date, event.end_date)}</p>
          {/* Add more event details or buttons as needed */}
        </div>
      ))}
    </div>
  );
}

export default Event;
