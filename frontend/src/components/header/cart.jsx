import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Links from "./links";
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "./logo";
import zsc from "../../images/zamalek-sports-club-seeklogo.png";
import { Link } from "react-router-dom";

function Cart({ toggleHiddenCart, showCart }) {
  const cartRef = useRef(null);

  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = "hidden";
      AOS.init();
    } else {
      document.body.style.overflow = "visible";
    }

    const handleOutsideClick = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        toggleHiddenCart();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      AOS.refresh();
    };
  }, [showCart]);

  return (
    <>
      {showCart && (
        <div className=" absolute w-full h-screen left-0 top-0 bg-black opacity-20"></div>
      )}
      <div
        ref={cartRef}
        className={`absolute  right-0 top-0 h-screen bg-white duration-300 overflow-hidden pt-4 text-black  ${
          showCart ? "w-[80%] sm:w-1/2 md:w-1/3  px-4" : "w-0"
        }`}
      >
        <div className=" flex justify-between items-center w-full">
          <h5 className=" text-2xl">Cart</h5>
          <FontAwesomeIcon
            icon={faTimes}
            size="lg"
            className=" cursor-pointer text-gray-600 hover:text-gray-900 duration-500 rotate-90 hover:rotate-0"
            onClick={toggleHiddenCart}
          />
        </div>
      </div>
    </>
  );
}

export default Cart;
