import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function DashboardProducts() {
  return (
    <div className="">
      <div className=" flex items-center gap-4 text-gray-900 ">
        <FontAwesomeIcon size="2xl" icon={faBars} />
        <h2 className=" font-bold text-2xl">products</h2>
      </div>
    </div>
  );
}

export default DashboardProducts;
