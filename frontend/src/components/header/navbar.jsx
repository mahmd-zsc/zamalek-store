import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Search from "./search";
import AOS from "aos";
import "aos/dist/aos.css";

function Navbar() {
  useEffect(() => {
    AOS.init();
  }, []);

  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const menuItems = [
    { name: "Search", icon: faSearch, onClick: toggleSearch },
    { name: "User", icon: faUser, onClick: () => console.log("User clicked") },
    {
      name: "Cart",
      icon: faShoppingCart,
      onClick: () => console.log("Cart clicked"),
    },
  ];

  return (
    <div>
      {showSearch && <Search onCancel={toggleSearch} />}
      {!showSearch && (
        <ul className="flex gap-4 justify-end">
          {menuItems.map((item, index) => (
            <li
              className={`${item.name === "User" ? "hidden sm:block" : null}`}
              key={index}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="w-6 cursor-pointer opacity-85 hover:opacity-100 duration-150 relative hover:-translate-y-1"
                onClick={item.onClick}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Navbar;
