import React from "react";
import Thead from "./thead";
import Tbody from "./tbody";

function ProductTable() {
  return (
    <div className=" m-4 py-6 px-6 bg-gray-2  border-2 border-gray-200 rounded-lg min-h-96">
      <Thead />
      <div className=" w-full h-[2px] bg-gray-200 my-2"></div>
      <Tbody />
    </div>
  );
}

export default ProductTable;
