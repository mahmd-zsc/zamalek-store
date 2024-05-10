import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../redux/slices/authSlice";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Change the duration as needed
      once: true, // Whether animation should happen only once
    });
  }, []);

  let { loginError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      return setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!password.trim()) {
      return setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (email && password) {
      dispatch(loginUser({ email, password }));
      setEmailError(false);
      setPasswordError(false);
    }
  };

  return (
    <div className="container  flex justify-center items-center">
      <div style={{minHeight : "calc(100vh - 10px)"}}
        className="max-w-lg  flex justify-center items-center flex-col"
        data-aos="fade-up"
      >
        <h2 className="capitalize text-3xl md:text-5xl mb-2">login</h2>
        <div className="mb-10 text-center">
          <p>
            Don't have an account?
            <span className="text-mainRed hover:underline">
              <Link to="/register"> Sign up here.</Link>{" "}
            </span>
          </p>
        </div>
        {loginError && (
          <div className="bg-red-300 w-full text-center py-1 mb-2 rounded-md text-red-500 font-sans border-2 border-red-400 opacity-80 hover: duration-200">
            {loginError.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full space-y-4 font-mono">
          <input
            placeholder={emailError ? "Email is required" : "Email"}
            type="email"
            value={email}
            onChange={(v) => setEmail(v.target.value)}
            className={`w-full px-8 py-4 border  rounded-md focus:outline-none  ${
              emailError
                ? "border-mainRed placeholder:text-mainRed"
                : "border-gray-300 text-black"
            }`}
          />
          <input
            placeholder={passwordError ? "Password is required" : "Password"}
            onChange={(p) => setPassword(p.target.value)}
            type="password"
            id="password"
            value={password}
            className={`w-full px-8 py-4 border border-gray-300 rounded-md focus:outline-none  ${
              passwordError
                ? "border-mainRed placeholder:text-mainRed"
                : "border-gray-300 text-black"
            }`}
          />

          <button
            type="submit"
            className="w-full shopNowSecondBlack bg-black px-4 py-2 rounded-md mt-2 border-2 border-black"
          >
            <span className="button-text">Login</span>
            <div className="fill-container"></div>
          </button>
        </form>
        <p className="mt-4">
          <Link to="/forgot-password" className="hover:underline">
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
