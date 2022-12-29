import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useAuth } from "./Auth";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, user } = useAuth();
  const navigate = useNavigate();

  const usernameChange = e => {
    setUsername(e.target.value)
    console.log(e.target.value)
  }

  const passwordChange = e => {
    setPassword(e.target.value)
  }

  //On login button press, call database endpoint with email and password
  const login = useCallback(
    (e) => {
      e.preventDefault();
      axios.post("http://localhost:3001/login", { username, password })
      .then((res) => (res.status == 200) ? successfulLogin(res.data.id) : console.log(res)) 
      .catch((err) => console.log(err));
    },
    [setUser, username, password]
  );

  //Upon successful login, set authentication state and move to account page
  const successfulLogin = (userID) => {
    setUser(userID)
    navigate("/list");
  }

  //Return login page: header, input fields, sign in button and sign up button
  return (
    <div className="Login">
    <center>
      <h1>Login</h1>
      <div className="Login">
      <TextField  label="Username" variant="filled" value={username} onChange={usernameChange}/>
      </div>
      <div className="Login">
        <TextField  label="Password" variant="filled" value={password} onChange={passwordChange}/>
      </div>
      <div className="Login">
        <Button variant="contained" onClick={login}>Log In</Button>
      </div>
      <div className="Login">
      <Button variant="contained" component={Link} to="/signup">Sign Up</Button>
      </div>
      </center>
    </div>
  );
};

export default Login;