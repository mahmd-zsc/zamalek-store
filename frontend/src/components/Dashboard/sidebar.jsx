import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/sidebar.css";
import {
  faChartBar,
  faUsers,
  faBox,
  faRuler,
  faFolder,
  faClipboardList,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const SidebarItem = ({ icon, text, to, isActive }) => {
  return (
    <li className={isActive ? "active" : ""}>
      <NavLink
        to={to}
        activeClassName="bg-mainRed text-white"
        className="flex items-center py-4 px-8 gap-6 hover:scale-110 text-gray-600 rounded-lg hover:text-white hover:bg-mainRed duration-500"
      >
        <FontAwesomeIcon icon={icon} /> {text}
      </NavLink>
    </li>
  );
};

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

  return (
    <div className="sidebar h-screen left-0 top-20 hidden md:block">
      <ul className="sidebar-nav grid gap-2 m-4">
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            to={item.to}
            isActive={pathname !== item.to && pathname.startsWith(item.to)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
