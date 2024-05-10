// Breadcrumbs.js

import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "");
  const breadcrumbs = [{ url: "/", label: "Home" }];

  return (
    <div className="breadcrumbs lg:w-[20%] capitalize text-xs">
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index}>
          <Link to={breadcrumb.url}>{breadcrumb.label}</Link>
          {" / "}
        </span>
      ))}
      {paths.length > 0 &&
        paths.map((path, index) => {
          const url = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;
          return (
            <span key={index + breadcrumbs.length}>
              {isLast ? <span>{path}</span> : <Link to={url}>{path}</Link>}
              {index < paths.length - 1 && " / "}
            </span>
          );
        })}
    </div>
  );
}

export default Breadcrumbs;
