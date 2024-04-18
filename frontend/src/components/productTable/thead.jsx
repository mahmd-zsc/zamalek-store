import React from "react";

function Thead() {
  return (
    <ul className=" flex capitalize mb-5 text-gray-700">
      <li className=" flex-1 ps-3">product</li>
      <li className=" w-1/5 text-center">category</li>
      <li className=" w-1/5 text-center">brand</li>
      <li className=" w-1/5 text-center">action</li>
    </ul>
  );
}

export default Thead;
