import React from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/apiCalls/productApiCalls";
import PriceFilter from "./priceFilter";
import CategoryFilter from "./categoryFilter";
import "./filter.css";
import SizeFilter from "./sizeFilter";
import ColorFilter from "./colorFilter";
import BrandFilter from "./brandFilter";
import SortBy from "../sortBy/sortBy";
import SortByFilter from "./sortByFilter";
function Filter() {
  return (
    <div className=" sticky top-12 h-screen    w-full  pb-5  custom-scrollbar  overflow-hidden  overflow-y-scroll ">
      <div className=" flex         flex-col gap-4 ">
        <div className=" mb-4">
          <h4 className="font-bold py-4 text-md text-black">Filter</h4>
          <div className="w-full h-[1px] bg-gray-400"></div>
        </div>
        <div className=" lg:hidden">
          <SortByFilter />
        </div>
        <PriceFilter />
        <CategoryFilter />
        <SizeFilter />
        <ColorFilter />
        <BrandFilter />
      </div>
    </div>
  );
}

export default Filter;
