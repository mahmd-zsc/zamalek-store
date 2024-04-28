import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
import { useSelector } from "react-redux";
function Links() {
  let { user } = useSelector((state) => state.auth);
  const linksArray = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Sale%", link: "/sale" },
  ];
  // { name: "Dashboard", link: "/dashboard" },
  const location = useLocation();

  // Check if the current route is the home route ("/")
  const isHomeRoute = location.pathname === "/";

  return (
    <nav className="flex     items-center justify-between  ">
      <ul className="flex md:flex-row flex-col gap-4 justify-center items-center text-xs roboto-bold ">
        {linksArray.map((linkItem, index) => (
          <li
            key={index}
            className={`header-link relative uppercase tracking-wider py-2 overflow-hidden  `}
          >
            <Link to={linkItem.link}>{linkItem.name}</Link>
          </li>
        ))}
        {user && user.isAdmin && (
          <li
            className={`header-link relative uppercase tracking-wider py-2 overflow-hidden  `}
          >
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Links;
