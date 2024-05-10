import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import AOS from "aos";
import "aos/dist/aos.css";

const Register = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Change the duration as needed
      once: true, // Whether animation should happen only once
    });
  }, []);

  const dispatch = useDispatch();
  let { registerError } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!username.trim()) {
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
    }

    if (!email.trim()) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (!password.trim()) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    // If all fields are filled, dispatch the registration action
    if (username && email && password) {
      dispatch(registerUser({ username, email, password }));
      setEmailError(false);
      setPasswordError(false);
      setUsernameError(false);
    }
  };

  return (
    <div className="container  flex justify-center items-center">
      <div 
      style={{minHeight : "calc(100vh - 10px)"}}
        className="max-w-lg  flex justify-center items-center flex-col"
        data-aos="fade-up"
      >
        <h2 className="capitalize text-3xl md:text-5xl mb-2">Register</h2>

        <div className="mb-10 text-center">
          <p>
            Already have an account?{" "}
            <span className="text-mainRed hover:underline">
              <Link to="/login">Login here.</Link>
            </span>
          </p>
        </div>
        {registerError && (
          <div className="bg-red-300 w-full text-center py-1 mb-2 rounded-md text-red-500 font-sans border-2 border-red-400 opacity-80 hover: duration-200">
            {registerError.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono">
          <input
            placeholder={usernameError ? "Username is required" : "Username"}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full px-8 py-4 border border-gray-300 rounded-md focus:outline-none ${
              usernameError ? "border-mainRed" : ""
            }`}
          />
          <input
            placeholder={emailError ? "Email is required" : "Email"}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-8 py-4 border border-gray-300 rounded-md focus:outline-none ${
              emailError ? "border-mainRed" : ""
            }`}
          />
          <input
            placeholder={passwordError ? "Password is required" : "Password"}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-8 py-4 border border-gray-300 rounded-md focus:outline-none ${
              passwordError ? "border-mainRed" : ""
            }`}
          />
          <button
            type="submit"
            className="w-full shopNowSecondBlack bg-black px-4 py-2 rounded-md mt-2 border-2 border-black"
          >
            <span className="button-text">create</span>
            <div className="fill-container"></div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
