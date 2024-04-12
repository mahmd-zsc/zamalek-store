import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav>
      <ul className=" flex gap-1 text-sm  ">
        <li className=" ">
          <Link to="/">Home  </Link>
        </li>
        {pathSegments.map((segment, index) => (
          <li key={segment}>
            {index === pathSegments.length - 1 ? (
              // Render current page segment as text instead of a link
              <span>/ {segment}</span>
            ) : (
              // Render other segments as clickable links
              <Link to={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                {segment}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
