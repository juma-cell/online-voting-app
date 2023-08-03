import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Voting from "./Pages/Voting";
import About from "./Pages/About";
import NotificationList from "./Pages/NotificationList";
import AuthProvider from "./Context/AuthContext";
import VoteProvider from "./Context/VoteContext";
import SingleEvent from "./Pages/SingleEvent";
import EventCandidates from "./Pages/EventCandidates";
import AddEventAndCandidate from "./Pages/AddEventAndCandidate";
import Candidates from "./Pages/candidates";


function App() {
  return (
<AuthProvider>
<VoteProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/about" element={<About />} />
          <Route path="/notification" element={<NotificationList />} />
          <Route path="/voting_events/:id" element={<SingleEvent />} />
          <Route path="/candidates/:id" element={<EventCandidates/>} />
          <Route path="/addevent" element={<AddEventAndCandidate/>} />
          <Route path="/candidates" element={<Candidates/>} />

        </Route>
      </Routes>
  </VoteProvider>
  </AuthProvider>
  );
}

export default App;
