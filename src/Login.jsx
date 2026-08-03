import React from 'react'
import { useState } from "react";
import './Login.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from './config/config';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  


  const handleSubmit = (e) => {
    e.preventDefault();
   signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href="/"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Email id or password wrong")
  });
   

  };


  return (
     <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <p>Welcome back! Please sign in to continue.</p>

        <form onSubmit={handleSubmit}>
        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />


         <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
         <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
