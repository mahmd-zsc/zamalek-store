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
import zamalekIcon from "../../images/zamalek-sports-club-seeklogo.png";
import "./sidebar.css";

const Sidebar = () => {
  // Hooks
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
  const [activeItemPosition, setActiveItemPosition] = useState({});
  let [openSidebar, setOpenSidebar] = useState(true);
  // Effects
  // Inside the useEffect hook
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setActiveItemPosition({
        height: 56,
        left: 16,
        top: 145,
      });
    } else {
      const activeElement = activeRef.current;
      if (activeElement) {
        const rect = activeElement.getBoundingClientRect();

        setActiveItemPosition({
          top: rect.top + window.pageYOffset,
          left: rect.left + window.pageXOffset,
          width: rect.width,
          height: rect.height,
        });
      }
    }
  }, [location.pathname]);

  console.log(activeItemPosition);
  // JSX
  return (
    <div
      className={` absolute lg:relative  ${
        openSidebar ? "lg:w-[30%] w-[90%]   " : "w-0"
      } duration-300  h-screen`}
    >
      <div
        className={`sidebar relative  overflow-hidden  flex-1  bg-white z-40 h-screen ${
          openSidebar ? "opacity-100" : " opacity-0 "
        } `}
      >
        <div className="mt-5 flex flex-col items-center mb-10">
          <img src={zamalekIcon} className="w-10" alt="" />
          <h1 className="superFont text-lg mt-2 text-black opacity-90">
            Zamalek
          </h1>
        </div>
        <ul className="sidebar-nav grid m-4">
          {sidebarItems.map(({ icon, text, to }, index) => (
            <li key={index}>
              <Link
                to={to}
                className={`flex items-center py-4 px-8 gap-6  duration-500 ${
                  location.pathname === to ? "active" : ""
                }`}
                ref={location.pathname === to ? activeRef : null}
              >
                <FontAwesomeIcon icon={icon} /> {text}
              </Link>
            </li>
          ))}
        </ul>
        {activeItemPosition && (
          <div
            className="activeItemPosition absolute rounded-l-full  -z-10 bg-[#ECF4FD] duration-300"
            style={{
              top: activeItemPosition.top,
              left: activeItemPosition.left,
              width: "100%",
              height: activeItemPosition.height,
            }}
          />
        )}
      </div>
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          class={`absolute left-full  top-1/2 angle flex h-6 w-6 flex-col items-center cursor-pointer `}
        >
          <div class=" relative top-[2px] angleTop h-3 w-1 rounded-full bg-mainRed duration-300 " />
          <div class=" relative bottom-[2px] angleBottom h-3 w-1 rounded-full bg-mainRed duration-300 " />
        </div>
      )}
      {!openSidebar && (
        <div
          onClick={() => setOpenSidebar(true)}
          class={`absolute left-full  top-1/2 angle flex h-6 w-6 flex-col items-center cursor-pointer `}
        >
          <div
            style={{ transform: "rotate(-30deg)" }}
            class=" relative top-[2px]  h-3 w-1 rounded-full bg-mainRed duration-300 "
          />
          <div
            style={{ transform: "rotate(30deg)" }}
            class=" relative bottom-[2px]  h-3 w-1 rounded-full bg-mainRed duration-300 "
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
