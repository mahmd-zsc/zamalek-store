import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Links from "./links";
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "./logo";
import zsc from "../../images/zamalek-sports-club-seeklogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Menu({ toggleHiddenMenu, showMenu }) {
  let { user } = useSelector((state) => state.auth);
  const menuRef = useRef(null);
  const links = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Sale%", link: "/sale" },
    // { name: "administrator", link: "/administrator" },
  ];

  useEffect(() => {
    // if (showMenu) {
    //   document.body.style.overflow = "hidden";
    // } else {
    //   document.body.style.overflow = "visible";
    // }

    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleHiddenMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);

  return (
    <>
      {showMenu && (
        <div className=" absolute w-full h-screen left-0 top-0 bg-black opacity-20"></div>
      )}
      <div
        ref={menuRef}
        className={`absolute right-0 top-0 bottom-0 h-screen bg-white duration-300 overflow-hidden pt-2 text-black ${
          showMenu ? "sm:w-full w-[80%] px-4" : "w-0"
        }`}
      >
        <>
          <div className=" flex justify-between items-center w-full">
            <div className="relative flex justify-center items-center gap-2">
              <img className="w-8" src={zsc} alt="" />
              <div className={`w-px h-14 duration-500 bg-black`}></div>
              <p className="text-black">
                official <span className="block">online store</span>
              </p>
            </div>
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              className=" cursor-pointer text-gray-600 hover:text-gray-900 duration-500 rotate-90 hover:rotate-0"
              onClick={toggleHiddenMenu}
            />
          </div>

          <ul className="flex  md:flex-row flex-col gap-4   text-xl mt-10 ">
            {links.map((linkItem, index) => (
              <li
                key={index}
                className={`header-link relative uppercase tracking-wider py-2 overflow-hidden  cursor-pointer `}
                onClick={toggleHiddenMenu}
              >
                <Link className=" w-full " to={linkItem.link}>
                  {linkItem.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex  md:flex-row flex-col text-sm text-gray-700 gap-2 pt-6  ">
            {user ? (
              <li
                className={` relative uppercase tracking-wider  overflow-hidden cursor-pointer `}
                onClick={toggleHiddenMenu}
              >
                <Link className=" w-full " to="/profile">
                  My Account
                </Link>
              </li>
            ) : (
              <>
                <li
                  className={` relative uppercase tracking-wider  overflow-hidden cursor-pointer `}
                  onClick={toggleHiddenMenu}
                >
                  <Link className=" w-full " to="/login">
                    Login
                  </Link>
                </li>
                <li
                  className={` relative uppercase tracking-wider  overflow-hidden cursor-pointer `}
                  onClick={toggleHiddenMenu}
                >
                  <Link className=" w-full " to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </>
      </div>
    </>
  );
}

export default Menu;
