import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faShoppingCart,
  faBars,
  faTimes,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import Search from "./search";
import AOS from "aos";
import "aos/dist/aos.css";
import Menu from "./menu";
import Cart from "./cart/cart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  let { user } = useSelector((state) => state.auth);
  let cart = useSelector((state) => state.cart);
  let navigate = useNavigate();
  useEffect(() => {
    AOS.init();
  }, []);

  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

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
    { name: "Search", icon: faSearch, onClick: () => setShowSearch(true) },
    {
      name: "User",
      icon: faUser,
      onClick: () => (user ? navigate("/profile") : navigate("/login")),
    },
    {
      name: "Cart",
      icon: faBagShopping,
      onClick: toggleShowCart,
    },
    { name: "Menu", icon: faBars, onClick: toggleShowMenu },
  ];

  useEffect(() => {
    if (cart.makeChange) {
      setTimeout(() => {
        setShowCart(true);
      }, 300);
    }
  }, [cart]);
  return (
    <div>
      <ul className="flex gap-4 justify-end ">
        {menuItems.map((item, index) => (
          <li
            onClick={item.onClick}
            key={index}
            className={` relative hover:-translate-y-1 duration-150 ${
              item.name === "User" ? "hidden md:block" : null
            } ${item.name === "Menu" ? "md:hidden" : null}`}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="w-6 cursor-pointer opacity-85 hover:opacity-100  relative "
            />
            {item.name === "Cart" && cart?.cartItems?.length > 0 && (
              <div className=" duration-300 absolute w-1 h-1 bg-mainRed rounded-full left-1/2 top-[14px] -translate-y-1/2 -translate-x-1/2"></div>
            )}
          </li>
        ))}
      </ul>{" "}
      <Search showSearch={showSearch} setShowSearch={setShowSearch} />
      <Menu showMenu={showMenu} toggleHiddenMenu={toggleHiddenMenu} />
      <Cart showCart={showCart} toggleHiddenCart={toggleHiddenCart} />
    </div>
  );
}

export default Navbar;
