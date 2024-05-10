import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../redux/apiCalls/profileApiCall";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import { ScrollToTop } from "../../utils/ScrollToTop ";

function Profile() {
  let dispatch = useDispatch();
  let { auth, profile } = useSelector((state) => state);
  let navigate = useNavigate();

  useEffect(() => {
    ScrollToTop()
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
    <div style={{minHeight : "calc(100vh - 10px)"}} className="">
      {profile.profile && (
        <div className="container h-full pt-32 md:pt-40">
          <div className="mb-20 flex md:items-center justify-between flex-col md:flex-row ">
            <h1 data-aos="fade-right" className="text-3xl md:text-5xl">
              My Account
            </h1>
            <button
              onClick={() => navigate("edit-profile")}
              data-aos="fade-left"
              className="shopNowSecondBlack bg-black px-4 py-2 rounded-xl mt-2 border-2 border-black my-2 w-fit"
            >
              <span className="button-text">edit profile</span>
              <div className="fill-container"></div>
            </button>
          </div>
          <div className="flex flex-col gap-4 md:flex-row min-h-[400px]">
            <div className="w-full" data-aos="fade-right">
              <h3 className="text-2xl mb-1 md:mb-4">Order History</h3>
              {!profile.profile.orders && (
                <div>
                  <p className="font-mono">
                    You haven't placed any orders yet.
                  </p>
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
          >
            <span className="button-text">logout</span>
            <div className="fill-container"></div>
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
