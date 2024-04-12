import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import AOS from "aos";
import "aos/dist/aos.css";

function Footer() {
  // useEffect(() => {
  //   AOS.init();
  // }, []);

  // Define media queries
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center">
        <div
          className={`flex flex-col justify-center items-center ${
            isSmallScreen ? "mb-8" : ""
          } sm:mb-0 sm:mr-8`}
        >
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg">Email: example@example.com</p>
          <p className="text-lg">Phone: +1 (123) 456-7890</p>
        </div>
        <div className="border-b border-gray-600 sm:border-b-0 sm:border-l sm:border-gray-600 h-10 sm:mx-8"></div>
        <div
          className={`flex flex-col justify-center items-center ${
            isSmallScreen ? "" : "flex"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
          <div className="flex items-center gap-4">
            <a href="#" className="text-lg">
              Facebook
            </a>
            <a href="#" className="text-lg">
              Twitter
            </a>
            <a href="#" className="text-lg">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
