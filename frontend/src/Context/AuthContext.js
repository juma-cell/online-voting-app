import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const nav = useNavigate();
  const [current_user, setCurrentUser] = useState();
  const [onChange, setOnChange] = useState(true);

   
  const login = (email, password) => {
    fetch("/login", { // Ensure that the URL matches the Rails controller route
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({ email, password }) // Ensure that the body contains the required parameters
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message) {
          nav("/");
          Swal.fire(
            'Success',
            response.message,
            'success'
          );
        } else {
          Swal.fire(
            'Error',
            "Login failed. Please check your credentials.",
            'error'
          );
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  }
  

  const signout = () => {
    fetch("/logout", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((response) => {
        setCurrentUser()
        setOnChange(!onChange);

        if (response.message) {
          nav("/login");
          Swal.fire(
            'Success',
            response.message,
            'success'
          );

        } else {
          nav("/login");

          Swal.fire(
            'Success',
            response.success,
            'success'
          );
        }
      });
  }

  const signup = (firstName, lastName,  userName, email, password) => {
    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, userName, email,  password }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          Swal.fire('Error', response.error, 'error');
        } else if (response.success) {
          nav('/login');
          Swal.fire('Success', response.success, 'success');
          setOnChange(!onChange);
        } else {
          Swal.fire('Error', 'Something went wrong', 'error');
        }
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  // Fetch current user
  useEffect(() => {
    fetch("/logged_in", { // Ensure that the URL matches the Rails controller route
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("current", response);
        if (response.user) {
          setCurrentUser(response.user);
        } else {
          setCurrentUser(null);
        }
      });
  }, [onChange]);

  const contextData = {
    login,
    signup,
    current_user,
    signout
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}
