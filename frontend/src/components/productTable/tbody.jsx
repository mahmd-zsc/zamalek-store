import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DeleteProductCard from "../deleteProductCard/deleteProductCard";
import editImage from "../../images/icons/pen.png";
import deleteImage from "../../images/icons/trash.png";
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
    <div className="   ">
      {products.data.map((p, index) => (
        <ul
          key={p.id}
          className={`flex items-center font-sans roboto-medium py-2 text-gray-700 border ${
            index % 2 === 0 ? "bg-white" : "bg-gray-100"
          } `}
        >
          <li
            onClick={() => navigate(`/products/${p.id}`)}
            className="flex items-center flex-1 cursor-pointer"
          >
            <div className="relative">
              <img
                className="w-20 h-20 hidden md:block"
                src={p.image.url}
                alt=""
              />
              <div className="absolute w-full h-full left-0 top-0"></div>
            </div>

            <div className="flex flex-col justify-evenly ps-3 md:ps-0">
              <p className="w-[90%]">{p.title}</p>
              <p className="opacity-70 text-xs">{p.price} EGY</p>
            </div>
          </li>
          <li className="w-1/4 text-sm text-center">{p.category.name}</li>
          <li className="w-1/4 flex justify-evenly">
            {/* <FontAwesomeIcon
              onClick={() => navigate(`edit-product/${p.id}`)}
              icon={faEdit}
              className="cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
            /> */}
            <img
              onClick={() => navigate(`edit-product/${p.id}`)}
              className=" w-8 hover:scale-105 duration-300 cursor-pointer"
              src={editImage}
              alt=""
            />
            {/* <FontAwesomeIcon
              onClick={() => deleteProductCardHandler(p.id)}
              icon={faTrashAlt}
              className="cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
            /> */}
            <img
              onClick={() => deleteProductCardHandler(p.id)}
              className=" w-8 hover:scale-105 duration-300 cursor-pointer"
              src={deleteImage}
              alt=""
            />
          </li>
        </ul>
      ))}

      <div className=" ">
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
