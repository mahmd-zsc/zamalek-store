// Logo.js
import React from "react";
import zsc from "../../images/zamalek-sports-club-seeklogo.png";
import { useLocation } from "react-router-dom";

function Logo({ hovered }) {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  return (
    <div className="relative flex justify-center items-center h-full gap-2">
      <img className="w-8" src={zsc} alt="" />
      {/* Add styles to make the line visible */}
      <div
        className={`w-px h-14 duration-500   ${
          isHomeRoute && hovered ? "bg-black" : " bg-white"
        } ${!isHomeRoute ? "bg-black" : null}   `}
      ></div>
      <p className="">
        official <span className="block">online store</span>
      </p>
    </div>
  );
}

export default Logo;
