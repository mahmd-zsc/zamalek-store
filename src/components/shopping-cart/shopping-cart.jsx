import React from "react";
import { useSelector } from "react-redux";
function ShoppingCart() {
  let open = useSelector((state) => state.setting.shopping);

  return (
    <div
      className={` bg-white shadow-md fixed right-0 top-0  h-screen duration-500 ${
        !open ? "w-0" : "w-1/3"
      } `}
    >
      hello world
    </div>
  );
}

export default ShoppingCart;
