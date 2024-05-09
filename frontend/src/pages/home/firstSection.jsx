import React, { useState, useEffect } from "react";
import obama from "../../images/home.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function FirstSection() {
  useEffect(() => {
    AOS.init();
  }, []);

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className="container grid sm:grid-cols-2 gap-8 justify-center items-center py-10 md:py-20"
      data-aos="fade-up"
    >
      <div className="relative">
        <div
          className="rounded-2xl w-full h-full"
          style={{
            backgroundColor: "#f1f1f1", // Placeholder background color
            display: imageLoaded ? "none" : "block",
          }}
        ></div>
        <img
          className="rounded-2xl w-full h-full"
          src={obama}
          alt=""
          style={{ display: imageLoaded ? "block" : "none" }}
          onLoad={handleImageLoad}
        />
        <div className="absolute left-0 top-0 w-full h-full "></div>
      </div>
      <div
        className="flex w-full md:block justify-center items-center flex-col"
        data-aos="fade-up"
      >
        <h5 className="text-2xl sm:text-3xl md:text-4xl flex md:block justify-center items-center flex-col">
          EXCEED EXPECTATIONS
          <span className="block text-xl sm:text-2xl md:text-3xl opacity-60">
            Explore our top picks
          </span>
        </h5>

        <button className="shopNowSecondBlack bg-black px-4 py-2 rounded-2xl mt-2 border-2 border-black ">
          <Link to="/shop?category=Kits">
            <span className="button-text">Shop Now</span>
          </Link>
          <div className="fill-container"></div>
        </button>
      </div>
    </div>
  );
}

export default FirstSection;
