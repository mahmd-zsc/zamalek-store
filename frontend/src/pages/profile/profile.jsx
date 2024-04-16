import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../redux/apiCalls/profileApiCall";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

function Profile() {
  let dispatch = useDispatch();
  let { auth, profile } = useSelector((state) => state);
  console.log(profile);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser(auth.user.id));
    // Initialize AOS when component mounts
    AOS.init({
      duration: 1000,
      once: true, // Only animate once
    });
  }, []);

  let logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    profile.profile && (
      <div className="container h-full mt-32 md:mt-40">
        <div className="mb-20" data-aos="fade-up">
          <h1 className="text-3xl md:text-5xl">My Account</h1>
        </div>
        <div className="flex flex-col gap-4 md:flex-row min-h-[400px]">
          <div className="w-full" data-aos="fade-right">
            <h3 className="text-2xl mb-1 md:mb-4">Order History</h3>
            {!profile.profile.orders && (
              <div>
                <p className="font-mono">You haven't placed any orders yet.</p>
              </div>
            )}
          </div>
          <div className="md:w-1/3" data-aos="fade-left">
            <h3 className="text-2xl mb-1 md:mb-4">Account Details</h3>
            <p className="font-mono">{profile.profile.username}</p>
            <p className="font-mono">{profile.profile.email}</p>
          </div>
        </div>
        <button
          onClick={logoutHandler}
          className="shopNowSecondBlack bg-black px-4 py-2 rounded-2xl mt-2 border-2 border-black my-2"
          data-aos="fade-up"
        >
          <span className="button-text">logout</span>
          <div className="fill-container"></div>
        </button>
      </div>
    )
  );
}

export default Profile;
