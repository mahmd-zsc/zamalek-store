import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Search({ onCancel }) {
  useEffect(() => {
    AOS.init();
    // Apply styles to prevent scrolling
    document.body.style.overflow = "hidden";

    return () => {
      // Remove styles when component unmounts
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div
      className={`search-container h-40 w-full bg-white absolute left-0 top-full`}
      data-aos="fade-down" // Add data-aos attribute here
    ></div>
  );
}

export default Search;
