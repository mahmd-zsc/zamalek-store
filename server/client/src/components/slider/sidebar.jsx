import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUsers,
  faBox,
  faRuler,
  faFolder,
  faClipboardList,
  faHeadset,
  faCopyright,
} from "@fortawesome/free-solid-svg-icons";
import zsc from "../../images/zamalek-sports-club-seeklogo.png";
// import zsc from "../../images/zamalek-sports-club-seeklogo.svg";
import "./sidebar.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  // Hooks
  let { fullSidebar, action } = useSelector((state) => state.dashboard);
  const location = useLocation();
  const sidebarItems = [
    { icon: faChartBar, text: "Dashboard", to: "/dashboard" },
    { icon: faBox, text: "Products", to: "/dashboard/products" },
    { icon: faUsers, text: "Users", to: "/dashboard/users" },
    { icon: faRuler, text: "Sizes", to: "/dashboard/sizes" },
    { icon: faFolder, text: "Categories", to: "/dashboard/categories" },
    { icon: faCopyright, text: "Brands", to: "/dashboard/brands" },
    { icon: faClipboardList, text: "Orders", to: "/dashboard/orders" },
    { icon: faHeadset, text: "Support", to: "/dashboard/support" },
  ];

  const activeRef = useRef(null);
  // Effects
  // Inside the useEffect hook

  // JSX
  return (
    <div
      className={`  lg:relative hidden md:block    ${
        fullSidebar && !action ? " " : "w-24"
      } duration-500  `}
    >
      <div
        className={`sidebar   overflow-hidden  flex-1  bg-white z-40 sticky top-0 h-screen `}
      >
        <div className=" flex relative  justify-center gap  items-center pb-16 mt-6 ">
          <img src={zsc} className="w-10" alt="" />
          {fullSidebar && !action && (
            <h1 className=" absolute top-12 superFont text-lg mt-2 text-black opacity-90">
              Zamalek
            </h1>
          )}
        </div>
        <ul className="sidebar-nav grid m-4 gap-2">
          {sidebarItems.map(({ icon, text, to }, index) => (
            <li key={index}>
              <Link
                to={to}
                className={`flex items-center  py-4  gap-6  duration-300 rounded-xl ${
                  fullSidebar && !action ? " justify-start px-8" : "px-0 justify-center"
                } ${location.pathname === to ? "active" : ""}`}
                ref={location.pathname === to ? activeRef : null}
              >
                <FontAwesomeIcon icon={icon} />{" "}
                <span className={`${fullSidebar && !action ? "block" : "hidden"}`}>
                  {text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
