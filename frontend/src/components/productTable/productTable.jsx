import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the CSS file for AOS
import Thead from "./thead";
import Tbody from "./tbody";

function ProductTable() {
  return (
    <div className="m-4 px-6 bg-gray-2 rounded-lg  ">
      <Thead />
      <Tbody />
    </div>
  );
}

export default ProductTable;
