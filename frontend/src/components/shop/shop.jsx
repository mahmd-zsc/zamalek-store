import React from "react";
import CategoryStickyBar from "./categoryStickyBar/categoryStickyBar";
import Filter from "./filter/filter";
import Products from "./products/products";
import Breadcrumbs from "./breadcrumbs";

function Shop() {
  return (
    <div className=" mt-36 min-h-screen  container font-sans text-">
      <CategoryStickyBar />
      <div className=" flex gap-2 ">
        <div className=" hidden lg:block ">
          <Filter />
        </div>
        <Products />
      </div>
    </div>
  );
}

export default Shop;
