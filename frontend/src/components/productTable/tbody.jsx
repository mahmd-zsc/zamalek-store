import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DeleteProductCard from "../deleteProductCard/deleteProductCard";

function Tbody() {
  const { products } = useSelector((state) => state.product);
  let navigate = useNavigate();
  let [deleteProductCard, setDeleteProductCard] = useState(false);
  let [deleteProductId, setDeleteProductId] = useState(null);
  let deleteProductCardHandler = (productId) => {
    setDeleteProductCard(true);
    setDeleteProductId(productId);
  };
  return (
    <div className="grid gap-px bg-gray-300">
      {products.data.map((p) => (
        <ul
          key={p.id}
          className="flex items-center font-sans roboto-medium py-2 text-gray-700 bg-white"
        >
          <li className="flex items-center flex-1">
            <div className="relative">
              <img className="w-20 h-20" src={p.image.url} alt="" />
              <div className="absolute w-full h-full left-0 top-0"></div>
            </div>

            <div className="flex flex-col justify-evenly">
              <p className="w-[90%]">{p.name}</p>
              <p className="opacity-70 text-sm">{p.price} EGY</p>
            </div>
          </li>
          <li className="w-1/5 text-sm text-center">{p.category.name}</li>
          <li className="w-1/5 text-center">{p.brand}</li>
          <li className="w-1/5 flex justify-evenly">
            <FontAwesomeIcon
              onClick={() => navigate(`edit-product/${p.id}`)}
              icon={faEdit}
              className=" cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
            />
            <FontAwesomeIcon
              onClick={() => deleteProductCardHandler(p.id)}
              icon={faTrashAlt}
              className=" cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
            />
          </li>
        </ul>
      ))}
      <div>
        <DeleteProductCard
          deleteProductCard={deleteProductCard}
          setDeleteProductCard={setDeleteProductCard}
          deleteProductId={deleteProductId}
        />
      </div>
    </div>
  );
}

export default Tbody;
