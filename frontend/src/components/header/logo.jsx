// Logo.js
import React from "react";
import zsc from "../../images/zamalek-sports-club-seeklogo.png";
import { Link, useLocation } from "react-router-dom";

function Logo({ hovered }) {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  return (
    <Link to="/">
      <div className="relative flex justify-center items-center h-full gap-2 superFont">
        <img className=" w-6 md:w-8" src={zsc} alt="" />
        {/* Add styles to make the line visible */}
        <div
          className={`w-px h-14 duration-500    
        ${isHomeRoute && !hovered ? "bg-white" : " "} 
        ${isHomeRoute && hovered ? "bg-black" : " "} 
        ${!isHomeRoute ? "bg-black" : " "} 
          
         
          `}
        ></div>
        <p className=" text-sm md:text-md">
          official <span className="block">online store</span>
        </p>
      </div>
    </Link>
  );
}

export default Logo;
