import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const nav = useNavigate();
  const [current_user, setCurrentUser] = useState();
  const [onChange, setOnChange] = useState(true);

  const login = (email, password) => {
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({ email, password })
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
        } else if (response.status) {
          Swal.fire(
            'Error',
            response.status,
            'error'
          );
          setOnChange(!onChange);
        } else {
          Swal.fire(
            'Error',
            "Something went wrong",
            'error'
          );
        }
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

        if (response.success) {
          nav("/");
          Swal.fire(
            'Success',
            response.success,
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
            Swal.fire('Success', response.message, 'success');
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
    fetch("/current", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("current", response)
        setCurrentUser(response);
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
