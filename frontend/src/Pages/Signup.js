import React, { useState, useCallback } from "react"
import { SelectDatepicker } from "react-select-datepicker"
import IMG from "../assets/Registration Page.png"

import Alert from "@mui/material/Alert"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

// React Recoil
import { useRecoilState } from "recoil"
import { userState } from "../atom/userAtom"

// React Router
import { useNavigate } from "react-router-dom"

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    fbn: "",
    email: "",
    mobileNumber: "",
    password: "",
    reEnterpassword: "",
    aadharPassword: "",
    loggedIn: false,
  })
  const [error, setError] = useState(null)
  const [user, setUser] = useRecoilState(userState)

  const submitData = () => {
    // Check if the user is logged in  already
    if (user.loggedIn) {
      setError("You are logged in already, Please Log out")
    }

    const enteredName = formData.name
    const enteredDob = formData.dob
    const enteredFbn = formData.fbn
    const enteredEmail = formData.email
    const enteredMobileNumber = formData.mobileNumber
    const enteredPassword = formData.password
    const reEnterpassword = formData.reEnterpassword
    const enteredAadharPassword = formData.aadharPassword

    if (
      !enteredName ||
      !enteredMobileNumber ||
      !enteredEmail ||
      !enteredDob ||
      !enteredFbn ||
      !enteredPassword ||
      !reEnterpassword ||
      !enteredAadharPassword
    ) {
      setError("All fields are required")
      return
    }

    if (enteredPassword.length < 7 || enteredPassword.length > 15) {
      setError("Password must be between 7 and 15 characters")
      return
    }

    if (enteredPassword !== reEnterpassword) {
      setError("Passwords entered do not match")
      return
    }

    setError(null)
    setUser(formData)
    alert("Account Successfully created, Please Proceed to login")
    navigate("/login")
  }

  return (
    <div className="md:flex py-10 mx-auto">
      <div className="w-[50%] mx-auto">
        <img src={IMG} alt="registration logo" />
      </div>

      <div className="w-[50%] mx-auto">
        <div className="signup_title mx-auto">Registration form</div>

        <div className="my-5">
          <div className="signup_label">Name</div>

          <input
            type="text"
            className="signup_input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="signup_label">Date of Birth</div>
        <span className="rounded-sm text-white">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{
                background: "#fff",
                width: "361px",
                padding: 0,
                borderRadius: "10px",
              }}
            >
              <DatePicker
                onChange={(newValue) =>
                  setFormData({ ...formData, dob: newValue })
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </span>

        <div className="mt-5">
          <div className="signup_label">Father's/Mother's Name</div>

          <input
            type="text"
            className="signup_input"
            value={formData.fbn}
            onChange={(e) => setFormData({ ...formData, fbn: e.target.value })}
          />
        </div>

        <div className="mt-5">
          <div className="signup_label">Email</div>

          <input
            type="email"
            className="signup_input"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div className="mt-5">
          <div className="signup_label">Mobile No.</div>

          <input
            type="number"
            className="signup_input"
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData({ ...formData, mobileNumber: e.target.value })
            }
          />
        </div>

        <div className="mt-5">
          <div className="signup_label">Password</div>

          <input
            type="password"
            className="signup_input"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div className="mt-5">
          <div className="signup_label">Re-enter Password</div>

          <input
            type="password"
            className="signup_input"
            value={formData.reEnterpassword}
            onChange={(e) =>
              setFormData({ ...formData, reEnterpassword: e.target.value })
            }
          />
        </div>

        <div className="mt-5">
          <div className="signup_label">Aadhar Number</div>

          <input
            type="text"
            className="signup_input"
            value={formData.aadharPassword}
            onChange={(e) =>
              setFormData({ ...formData, aadharPassword: e.target.value })
            }
          />
        </div>

        <div className="mt-5 w-[361px]">
          {error && <Alert severity="error">{error}</Alert>}
        </div>

        <div className="mx-auto mt-5">
          <button className="signup_button" onClick={submitData}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup
