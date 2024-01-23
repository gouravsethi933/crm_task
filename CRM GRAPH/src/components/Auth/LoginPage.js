//React
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../slices/authSlice";
import "./LoginPage.css";
import axios from "axios";

const LoginForm = () => {
  //------------------------------------state-----------------------------------
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
//----------------------------------useDispatch-----------------------------------
  const dispatch = useDispatch();
  //------------------------------------function-----------------------------------
  const handleLogin = async () => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: username,
        password: password,
      });

      const data = response.data;
      const isAuthenticationSuccessful = data.token;

      if (isAuthenticationSuccessful) {
        localStorage.setItem("login", "true");
        dispatch(setAuth(true));
        navigate("/graph");
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  //--------------------------------------------jsx---------------------------------
  return (
    <div className="loginContainer">
      <h2 className="loginHeader">Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => {
            setUsername(e.target.value);
            setIsTyping(true);
          }}
          className={isTyping && !isValidEmail ? "invalid" : ""}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
            setIsTyping(true);
          }}
          className={isTyping && !isValidPassword ? "invalid" : ""}
          style={{ color: isValidPassword ? "black" : "red" }}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
