import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { VoteContext } from '../Context/VoteContext';
import IMG from "../assets/vote.png"

function Home() {
  const { votingEvents } = useContext(VoteContext);

  useEffect(() => {
    // Your useEffect logic here if needed
  }, []);

  return (
    <>
      {votingEvents.length > 0 ? (
        votingEvents.map((votingEvent) => (
          <article key={votingEvent._id} className="rounded-xl border-2 border-gray-100  text-white mb-8">
            <Link to={`/voting_events/${votingEvent._id}`} className="container mx-auto px-4 text-[10px] font-medium sm:text-xs">
              <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                <div>
                  <h3 className="font-medium sm:text-lg">
                    <h1>{votingEvent.eventsName}</h1>
                  </h3>
                  <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                    <div className="flex items-center gap-1 text-gray-500"></div>
                    <span className="hidden sm:block" aria-hidden="true">&middot;</span>
                    <p className="hidden sm:block lg:text-xl sm:text-blue-500">{votingEvent.eventsDescription}</p>
                  </div>
                  <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                    <div className="flex items-center gap-1 text-gray-500"></div>
                    <span className="hidden sm:block" aria-hidden="true">&middot;</span>
                    <p className="hidden sm:block sm:text-xs sm:text-gray-500">Posted by user {votingEvent.user_id}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                </div>
                
              </div>
            </Link>
          </article>
        ))
      ) : (
        <p>No voting events found.</p>
      )}
    </>
  );
}

export default Home;
