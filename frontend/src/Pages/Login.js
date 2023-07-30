import React, { useState } from "react"
import IMG from "../assets/Login Page.png"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import Alert from "@mui/material/Alert"

// React Recoil
import { useRecoilState } from "recoil"
import { userState } from "../atom/userAtom"

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [user, setUser] = useRecoilState(userState)
  const [error, setError] = useState(null)

  const loginUser = () => {
    setError(null)
    const enteredEmail = formData.email
    const enteredPassword = formData.password

    const stateEmail = user.email
    const statePassword = user.password

    if (!enteredEmail || !enteredPassword) {
      setError("Please Fill All Input Fields")
      return
    }

    if (enteredEmail !== stateEmail || enteredPassword !== statePassword) {
      setError("Email and Password are incorrect")
      return
    }

    //  Logic for validating users

    //setting app wide state
    setError(null)
    setUser({ ...user, loggedIn: true })
    navigate("/")
  }

  return (
    <div className="md:flex py-10 mx-auto">
      <div className="w-[50%] mx-auto">
        <img src={IMG} alt="registration logo" />
      </div>

      <div className="w-[50%] mx-auto my-auto">
        <div className="signup_title mx-auto">Login</div>

        <div className="mt-5">
          <div className="signup_label">Email</div>

          <input
            type="email"
            className="signup_input text-black"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div className="mt-5">
          <div className="signup_label">Password</div>

          <input
            type="password"
            value={formData.password}
            className="signup_input text-black"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div className="login_forgot_password">Forgot Password</div>
        <div>
          Not a user?{" "}
          <Link to="/signup" className="login_forgot_password">
            Register now
          </Link>
        </div>

        <div className="mt-5 w-[361px]">
          {error && <Alert severity="error">{error}</Alert>}
        </div>

        <div className="mx-auto mt-5">
          <button className="signup_button" onClick={loginUser}>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
