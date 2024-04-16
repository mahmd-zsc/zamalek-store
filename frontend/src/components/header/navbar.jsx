import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faShoppingCart,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Search from "./search";
import AOS from "aos";
import "aos/dist/aos.css";
import Menu from "./menu";
import Cart from "./cart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  let { user } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  useEffect(() => {
    AOS.init();
  }, []);

  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const toggleSearch = () => {
    setShowSearch(true);
  };

  const toggleShowMenu = () => {
    setShowMenu(true);
  };
  const toggleHiddenMenu = () => {
    setShowMenu(false);
  };
  const toggleShowCart = () => {
    setShowCart(true);
  };
  const toggleHiddenCart = () => {
    setShowCart(false);
  };

  const menuItems = [
    { name: "Search", icon: faSearch, onClick: toggleSearch },
    {
      name: "User",
      icon: faUser,
      onClick: () => (user ? navigate("/profile") : navigate("/login")),
    },
    {
      name: "Cart",
      icon: faShoppingCart,
      onClick: toggleShowCart,
    },
    { name: "Menu", icon: faBars, onClick: toggleShowMenu },
  ];

  return (
    <div>
      {showSearch && <Search onCancel={toggleSearch} />}
      <ul className="flex gap-4 justify-end">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`${item.name === "User" ? "hidden md:block" : null} ${
              item.name === "Menu" ? "md:hidden" : null
            }`}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="w-6 cursor-pointer opacity-85 hover:opacity-100 duration-150 relative hover:-translate-y-1"
              onClick={item.onClick}
            />
          </li>
        ))}
      </ul>
      <Menu showMenu={showMenu} toggleHiddenMenu={toggleHiddenMenu} />
      <Cart showCart={showCart} toggleHiddenCart={toggleHiddenCart} />
    </div>
  );
}

export default Navbar;
