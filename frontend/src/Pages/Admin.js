import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VoteContext } from "../Context/VoteContext";

function Admin() {
  const { BaseUrl } = useContext(VoteContext);
  const [votingEvents, setVotingEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BaseUrl}/voting_events`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        setVotingEvents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [BaseUrl]);

  console.log(votingEvents);

  return (
    <div className="mt-20">
      <h2 className="text-xl font-semibold text-blue-800 mb-2 uppercase text-center">
        ALL Events {votingEvents?.length > 0 && `(${votingEvents.length} events)`}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {votingEvents?.length > 0 ? (
          votingEvents.map((votingEvent, index) => {
            const eventExpired = new Date(votingEvent.endTime) < new Date();

            return (
              <article
                key={index}
                className={`rounded-xl border-2 ${
                  eventExpired ? "border-red-500" : "border-gray-100"
                } text-white`}
              >
                <Link
                  to={`/voting_events/${votingEvent.id}`}
                  className="block p-4 sm:p-6 lg:p-8 text-[10px] font-medium sm:text-xs"
                >
                  <div className="flex flex-col h-full">
                    <h1 className="font-large sm:text-lg">
                      {votingEvent.eventsName}
                    </h1>
                    <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                      <div className="flex items-center gap-1 text-gray-500">
                        {eventExpired ? (
                          <span className="text-red-500">Expired</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })
        ) : (
          <p>No voting events found.</p>
        )}
      </div>
    </div>
  );
}

export default Admin;
