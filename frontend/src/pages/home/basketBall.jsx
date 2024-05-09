import React, { useEffect } from "react";
import players from "../../images/download 4.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

function BasketBall() {
  let navigate = useNavigate();
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className="container  grid sm:grid-cols-2 gap-8 justify-center items-center py-10 md:py-20"
      data-aos="fade-up" // Add data-aos attribute here
    >
      <div className="relative">
        <img className="rounded-2xl" src={players} alt="" />
        <div className="absolute left-0 top-0 w-full h-full"></div>
      </div>
      <div
        className="flex w-full md:block justify-center items-center flex-col"
        data-aos="fade-up" // Add data-aos attribute here
      >
        <h5 className="text-2xl sm:text-3xl md:text-4xl flex md:block justify-center items-center flex-col">
          DOUBLE THE THRILL!
          <span className="block text-xl sm:text-2xl md:text-3xl opacity-70">
            Score big with our latest collection
          </span>
        </h5>

        <button className="shopNowSecondBlack bg-black px-4 py-2 rounded-2xl mt-2 border-2 border-black">
          <span
            onClick={() => navigate("/shop?category=Kits")}
            className="button-text"
          >
            Shop Now
          </span>
          <div className="fill-container"></div>
        </button>
      </div>
    </div>
  );
}

export default BasketBall;
