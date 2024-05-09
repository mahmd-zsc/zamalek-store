import React, { useEffect } from "react";
import Thead from "./thead";
import Tbody from "./tbody";
import "./productTable.css";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/apiCalls/productApiCalls";
function ProductTable() {
  let dispatch = useDispatch;

  return (
    <div className="my-4  bg-gray-2 rounded-lg   ">
      <Thead />
      <Tbody />
    </div>
  );
}

export default ProductTable;
