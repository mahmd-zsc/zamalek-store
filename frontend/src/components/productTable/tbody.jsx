import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faEllipsisVertical,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import { fetchProducts } from "../../redux/apiCalls/productApiCalls";
import Action from "./action";
import { Link, useNavigate } from "react-router-dom";
function Tbody() {
  const { products } = useSelector((state) => state.product);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  return (
    <div className=" relative top-2  flex flex-col rounded-lg     ">
      {products &&
        products.data &&
        products?.data?.map((p, index) => (
          <ul
            key={p.id}
            className={`   flex items-center font-sans roboto-medium py-3 text-gray-700  bg-white px-3 duration-300 hover:bg-gray-200   `}
          >
            <li
              onClick={() =>
                navigate(`/shop/products/${p.title.replace(/\s/g, "-")}`)
              }
              className="flex-1 flex items-center gap-2 overflow-hidden cursor-pointer "
            >
              <img className="w-10 hidden sm:block" src={p.image.url} alt="" />
              <span className="flex-1 max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis opacity-80">
                {p.title}
              </span>
            </li>

            <li className=" w-1/4 sm:w-1/6 flex items-center justify-center overflow-hidden">
              <span className=" text-sm opacity-80 ">{p?.category?.name}</span>
            </li>
            <li className=" w-1/4 sm:w-1/6 flex items-center justify-center overflow-hidden">
              <span className="text-sm opacity-80 ">{p?.brand?.name}</span>
            </li>
            <li className="sm:flex hidden w-1/6 items-center justify-center overflow-hidden">
              <span className="text-xs opacity-80 ">{p?.price} </span>
            </li>
            <li className=" sm:flex hidden w-1/6  items-center justify-center overflow-hidden">
              <span className="text-xs opacity-80 ">
                {p.discount ? p.discount : 0}{" "}
              </span>
            </li>
            <Action data={p} />
          </ul>
        ))}
    </div>
  );
}

export default Tbody;
