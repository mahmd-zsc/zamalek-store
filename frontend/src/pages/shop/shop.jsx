import React from "react";
import Filter from "../../components/filter/filter";
// import Products from "./products/products";

function Shop() {
  return (
    <div className=" pt-36 min-h-screen  container font-sans bg-gray-100">
      <div className=" flex gap-2 ">
        <div className=" hidden lg:block ">
          <Filter />
        </div>
        {/* <Products /> */}
      </div>
    </div>
  );
}

export default Shop;
