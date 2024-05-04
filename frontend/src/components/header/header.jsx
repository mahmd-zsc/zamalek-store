import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./logo";
import Navbar from "./navbar";
import Links from "./links";
import Menu from "./menu";

function Header() {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";
  const [hovered, setHovered] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      setHovered(window.scrollY > 60);
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const navbar = navbarRef.current;
    
      if (scrollTop <= lastScrollTop || scrollTop < 80) {
        navbar.style.transform = "translateY(0)";
      } else {
        // Only set translateY(-100%) if overflow is not hidden
        if (document.body.style.overflow !== "hidden") {
          navbar.style.transform = "translateY(-100%)";
        }
      }
      lastScrollTop = scrollTop;
    };
    

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClasses = `fixed z-20 w-full duration-500 ${
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
      ref={navbarRef}
      className={headerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="py-2 flex gap-2 lg:mx-10 md:mx-8 sm:mx-6 mx-4  md:gap-20 items-center justify-between m-auto">
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
