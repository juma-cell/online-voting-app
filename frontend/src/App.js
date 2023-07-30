import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
// import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Election from "./Pages/Election";
import Voting from "./Pages/Voting";
import About from "./Pages/About";
import NotificationList from "./Pages/NotificationList";
import AuthProvider from "./Context/AuthContext";


function App() {
  return (
<AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/election" element={<Election />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/about" element={<About />} />
          <Route path="/notification" element={<NotificationList />} />
        </Route>
      </Routes>
  </AuthProvider>
  );
}

export default App;
