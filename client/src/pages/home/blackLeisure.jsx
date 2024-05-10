import React, { useEffect } from "react";
import backgroundImage from "../../images/black-plain-concrete-textured.jpg";
import people from "../../images/Remove-bg.ai_1710858884778.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function BlackLeisure() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="relative bg-black flex py-20" data-aos="fade-up">
      <img
        className="w-full h-full absolute left-0 top-0 opacity-25 "
        src={backgroundImage}
        alt=""
      />

      <div className="absolute left-0 top-0 w-full h-full  "></div>
      <div
        className="container grid sm:grid-cols-2 gap-10 justify-center items-center"
        data-aos="fade-up"
      >
        <div className="textBox  order-2 flex flex-col ">
          <h6 className="text-white text-3xl sm:text-4xl md:text-5xl text-center sm:text-left">
            Black Leisure Cotton <span className=" lg:block">T-Shirts</span>
          </h6>
          <button className="shopNowSecondWhite block px-4 py-2 rounded-2xl mt-2 border-2 w-fit mx-auto sm:mx-0  ">
            <Link to="/shop?category=Fashion">
              <span className="button-text">Shop Now</span>
            </Link>
            <div className="fill-container"></div>
          </button>
        </div>
        <div className=" relative order-1 sm:order-2">
          <img className="bg-white " src={people} alt="" data-aos="fade-left" />
          <div className=" absolute left-0 top-0 w-full h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default BlackLeisure;
