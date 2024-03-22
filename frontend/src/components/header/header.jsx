import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./logo";
import Navbar from "./navbar";
import Links from "./links";

function Header() {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHovered(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClasses = `fixed z-40 w-full duration-500 ${
    isHomeRoute
      ? hovered
        ? "bg-white text-black"
        : "hover:bg-white text-white hover:text-black"
      : "bg-white text-black"
  }`;

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <header
      className={headerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="py-2 flex gap-2 container md:gap-20 items-center justify-between m-auto">
        <Logo hovered={hovered} isHomeRoute={isHomeRoute} />
        <div className="hidden md:block">
          <Links />
        </div>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
