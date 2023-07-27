import React from "react"
import IMG from "../assets/Registration Page.png"

function Signup() {
  return (
    <div className="md:flex max-w-6xl py-10 mx-auto">
      <div className="w-[50%] mx-auto">
        <img src={IMG} alt="registration logo" />
      </div>

      <div className="w-[50%] mx-auto">
        <div className="signup_title mx-auto">Registration form</div>

        <div className="mt-5">
          <div className="signup_label">Name</div>

          <input type="text" className="signup_input" />
        </div>

        <div className="mt-5">
          <div className="signup_label">Date Of Birth</div>

          <input type="text" className="signup_input" />
        </div>

        <div className="mt-5">
          <div className="signup_label">Father's/Mother's Name</div>

          <input type="text" className="signup_input" />
        </div>

        <div className="mt-5">
          <div className="signup_label">Email</div>

          <input type="text" className="signup_input" />
        </div>

        <div className="mt-5">
          <div className="signup_label">Mobile No.</div>

          <input type="text" className="signup_input" />
        </div>

        <div className="mt-5">
          <div className="signup_label">Password</div>

          <input type="text" className="signup_input" />
        </div>

        <div className="mt-5">
          <div className="signup_label">Re-enter Password</div>

          <input type="text" className="signup_input" />
        </div>

        <div className="mt-5">
          <div className="signup_label">Re-enter Password</div>

          <input type="text" className="signup_input" />
        </div>

        <div className="mt-5">
          <div className="signup_label">Aadhar Number</div>

          <input type="text" className="signup_input" />
        </div>

        <div className="mx-auto">
          <button className="signup_button">SUBMIT</button>
        </div>
      </div>
    </div>
  )
}

export default Signup
