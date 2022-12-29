import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useAuth } from "./Auth";
import axios from "axios";

//Render sign up page by rendering register component
function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUser, user } = useAuth();
    const navigate = useNavigate();
  
    const usernameChange = e => {
      setUsername(e.target.value)
    }
  
    const passwordChange = e => {
      setPassword(e.target.value)
    }
  
    //On login button press, call database endpoint with email and password
    const signUp = useCallback(
      (e) => {
        e.preventDefault();
        console.log("Hello");
        axios.post("http://localhost:3001/create-user", { username, password })
        .then((res) => (res.status == 201) ? successfulSignUp() : console.log(res)) 
        .catch((err) => console.log(err));
      },
      [setUser, username, password]
    );

    
    //Upon successful login, set authentication state and move to account page
    const successfulSignUp = (userID) => {
      navigate("/login");
    }
  
  
  
    //Return login page: header, input fields, sign in button and sign up button
    return (
      <div className="Login">
        <center>
            <h1>Sign Up</h1>
            <div className="Login">
                <TextField  label="Username" variant="filled" value={username} onChange={usernameChange}   />
            </div>
            <div className="Login">
                <TextField  label="Password" variant="filled" value={password} onChange={passwordChange}/>
            </div>
            <div className="Login">
                <Button variant="contained" onClick={signUp}>Sign Up</Button>
            </div>
        </center>
      </div>
    );
}

export default SignUp;