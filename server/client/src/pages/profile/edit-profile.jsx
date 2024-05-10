import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { authActions } from "../../redux/slices/authSlice";
// import { updateUser } from "../../redux/apiCalls/userApiCall"; // Assuming you have an API call function for updating user info
import AOS from "aos";
import "aos/dist/aos.css";
import { getUser, updateUser } from "../../redux/apiCalls/profileApiCall";

const EditProfile = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  let { user } = useSelector((state) => state.auth);
  let { error } = useSelector((state) => state.profile);
  // Assuming you have a slice for handling user updates
  let { profile } = useSelector((state) => state.profile); //
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(profile ? profile.email : "");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};

    if (username.trim()) {
      formData.username = username;
    }

    if (email.trim()) {
      formData.email = email;
    }

    if (password.trim()) {
      formData.password = password;
    }
    dispatch(updateUser(formData));
    if (!error) {
      navigate("/profile");
    }
  };

  return (
    <div className="container py-20 flex justify-center items-center">
      <div
        className="max-w-lg h-[600px] flex justify-center items-center flex-col"
        data-aos="fade-up"
      >
        <h2 className="capitalize text-3xl md:text-5xl mb-2">Edit Profile</h2>
        {error && (
          <div className="bg-red-300 w-full text-center py-1 mb-2 rounded-md text-red-500 font-sans border-2 border-red-400 opacity-80 hover: duration-200">
            {error.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full space-y-4 font-mono">
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-8 py-4 border rounded-md focus:outline-none border-gray-300 text-black"
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-8 py-4 border rounded-md focus:outline-none border-gray-300 text-black"
          />
          <input
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="newPassword"
            value={password}
            className="w-full px-8 py-4 border border-gray-300 rounded-md focus:outline-none  text-black"
          />

          <button
            type="submit"
            className="w-full shopNowSecondBlack bg-black px-4 py-2 rounded-md mt-2 border-2 border-black"
          >
            <span className="button-text">Save Changes</span>
            <div className="fill-container"></div>
          </button>
        </form>
        <p className="mt-4">
          <Link to="/profile" className="hover:underline">
            Go back to profile
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EditProfile;
