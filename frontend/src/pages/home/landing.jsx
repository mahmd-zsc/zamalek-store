import React, { useEffect } from "react";
import backgroundImage from "../../images/download.jpg";
import "./shopNow.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function Landing() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className="relative h-[650px] grid grid-cols-1 md:grid-cols-2 justify-center items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
      data-aos="fade-up" // Add data-aos attribute here
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="hidden md:block"></div>
      <div className="relative flex flex-col justify-center items-center translate-y-20">
        <div className="flex md:block justify-center items-center flex-col">
          <h3 className="text-white text-3xl sm:text-4xl md:text-5xl flex md:block justify-center items-center flex-col">
            ZAMALEK 2023/24{" "}
            <span className="block text-2xl sm:text-3xl md:text-4xl opacity-80">
              HOME & AWAY
            </span>
          </h3>
          <Link to="/shop/products/Zamalek-Home-Match-Jersey-23-24---Fan-Edition">
          <button className="shopNow font-bold block px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 mt-2">
            Shop Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
