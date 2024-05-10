import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import CartBox from "./cartBox";
import "./cart.css";
import { Link } from "react-router-dom";

function Cart({ toggleHiddenCart, showCart }) {
  const cartRef = useRef(null);
  const { cartItems , totalPrice } = useSelector((state) => state.cart);

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

  // Calculate total price

  return (
    <>
      {showCart && (
        <div className="fixed w-full h-screen left-0 top-0 bg-black opacity-20"></div>
      )}
      <div
        ref={cartRef}
        className={`flex flex-col fixed right-0 top-0 h-screen bg-white duration-300 overflow-hidden overflow-y-scroll text-black ${
          showCart
            ? "w-[80%] sm:w-1/2 md:w-[40%] lg:w-[25%] pt-4 px-4 opacity-100"
            : "w-0 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <h5 className="text-2xl font-bold">
            Cart{" "}
            <span className="text-xs font-thin">items {cartItems.length}</span>
          </h5>
          <FontAwesomeIcon
            icon={faTimes}
            size="lg"
            className="cursor-pointer text-gray-600 hover:text-gray-900 duration-500 rotate-90 hover:rotate-0"
            onClick={toggleHiddenCart}
          />
        </div>
        <div className="h-1 bg-red-700 rounded-full mt-6"></div>
        {cartItems?.length > 0 ? (
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-10 mt-6 pb-6 flex-1">
              {cartItems.map((c) => (
                <CartBox data={c} key={c.id} />
              ))}
            </div>
            <div className="my-2">
              <div className=" flex justify-center items-center flex-col gap-1">
                <button className="blackBottom w-[70%]">
                  Checkout
                </button>
                <p className=" text-xs">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <p className="text-center text-xs">Your cart is currently empty.</p>
            <div className="flex flex-col gap-4 mt-6 capitalize text-center">
              <Link
                onClick={() => toggleHiddenCart()}
                to="/"
                className="whiteBottom border border-black mx-8 rounded-lg"
              >
                home
              </Link>
              <Link
                onClick={() => toggleHiddenCart()}
                to="/shop"
                className="whiteBottom border border-black mx-8 rounded-lg py-2"
              >
                shop
              </Link>
              <Link
                onClick={() => toggleHiddenCart()}
                to="/sale"
                className="whiteBottom border border-black mx-8 rounded-lg py-2"
              >
                sale%
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
