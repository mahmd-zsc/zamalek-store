import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebar.css";
import {
  faChartBar,
  faUsers,
  faBox,
  faRuler,
  faFolder,
  faClipboardList,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const { pathname } = useLocation();
  const sidebarItems = [
    { icon: faChartBar, text: "Dashboard", to: "/dashboard" },
    { icon: faBox, text: "Products", to: "/dashboard/products" },
    { icon: faUsers, text: "Users", to: "/dashboard/users" },
    { icon: faRuler, text: "Sizes", to: "/dashboard/sizes" },
    { icon: faFolder, text: "Categories", to: "/dashboard/categories" },
    { icon: faClipboardList, text: "Orders", to: "/dashboard/orders" },
    { icon: faHeadset, text: "Support", to: "/dashboard/support" },
  ];
  console.log(pathname === sidebarItems[0].to);

  return (
    <div className="sidebar h-screen left-0 top-20 hidden md:block  ">
      <ul className="sidebar-nav grid gap-2 m-4">
        {sidebarItems.map(({ icon, text, to }, index) => (
          <li
            key={index}
            onClick={() => console.log(to)}
            className={pathname === to ? "active " : "null"}
          >
            <Link
              to={to}
              className="flex items-center   py-4 px-8 gap-6 hover:scale-110  rounded-lg hover:text-white hover:bg-mainRed duration-500"
            >
              <FontAwesomeIcon icon={icon} /> {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
