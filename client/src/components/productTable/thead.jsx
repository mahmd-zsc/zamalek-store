import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { dashboardActions } from "../../redux/slices/dashboardSlice";

function Thead() {
  let dispatch = useDispatch();
  return (
    <ul className=" flex capitalize  py-4  text-gray-500 bg-white rounded-lg">
      <li className=" flex-1 ps-3 ">product name</li>
      <li className=" w-1/4 sm:w-1/6 text-center">category</li>
      <li className=" w-1/4 sm:w-1/6 text-center">brand</li>
      <li className=" sm:block hidden w-1/6 text-center">price</li>
      <li className=" sm:block hidden w-1/6 text-center">discount</li>
      <li className=" relative w-1/12 flex px-5 text-center justify-end items-center">
        <div
          onClick={() => dispatch(dashboardActions.setAction("create-product"))}
          className="createProduct relative text-white hover:text-black cursor-pointer duration-300"
        >
          <FontAwesomeIcon icon={faPlus} className=" relative z-40   " />
          <div className=" absolute w-10 h-10 bg-black  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 rounded-full border border-black"></div>
        </div>
      </li>
    </ul>
  );
}

export default Thead;
