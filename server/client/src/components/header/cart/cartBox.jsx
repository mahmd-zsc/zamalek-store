import axios from "axios";
import React, { useEffect, useState } from "react";
import request from "../../../utils/request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  changeTotalPrice,
  minusCart,
  plusCart,
  removeCart,
} from "../../../redux/apiCalls/cartApiCall";
import { cartActions } from "../../../redux/slices/cartSlice";

function CartBox({ data }) {
  let [product, setProduct] = useState(null); // Initialize product state to null
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(true);
  let [size, setSize] = useState();
  let [imageLoading, setImageLoading] = useState(false);
  let dispatch = useDispatch();
  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "...";
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ProductResponse = await request.get(`products/id/${data.id}`);
        setProduct(ProductResponse.data); // Update product state with the fetched data
        if (data.size) {
          const SizeResponse = await request.get(`sizes/${data.size}`);
          setSize(SizeResponse.data); // Update size state with the fetched data
        }
        setLoading(false);
      } catch (error) {
        setError(error.response.data);
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function
  }, [data.id, data.size]);

  useEffect(() => {
    if (product) {
      const totalPrice = (product.price - product.discount) * data.quantity;
      // dispatch(cartActions.addToTotalPrice(totalPrice));
    }
  }, [product, data.quantity, dispatch]);

  return (
    <div>
      {product && !loading && (
        <div className={`flex ${imageLoading ? "opacity-100" : "opacity-0"}`}>
          <img
            onLoad={() => {
              setImageLoading(true);
              // dispatch(cartActions.setMakeChange(true));
            }}
            className="w-20 rounded-lg"
            src={product.image.url}
            alt=""
          />
          <div className="flex-1">
            <p className="text-sm">{truncateDescription(product.title, 25)}</p>
            {size && <p className="text-xs pt-3">Size: {size.name}</p>}
            {!size && data.size && (
              <p className="text-xs pt-3">Size: {data.size}</p>
            )}
            <div className="flex gap-2 relative items-end top-4">
              <div className="flex items-center w-16 justify-between rounded-sm border-gray-400 border text-gray-500">
                <div
                  onClick={() => dispatch(plusCart(data.id))}
                  className="border-gray-400 border-r px-1 cursor-pointer plus"
                >
                  <FontAwesomeIcon
                    className="duration-200 text-xs"
                    icon={faPlus}
                  />
                </div>
                <span className="flex-1 text-center text-xs">
                  {data.quantity}
                </span>
                <div
                  onClick={() => dispatch(minusCart(data.id))}
                  className="border-gray-400 border-l px-1 cursor-pointer minus"
                >
                  <FontAwesomeIcon
                    className="duration-200 text-xs"
                    icon={faMinus}
                  />
                </div>
              </div>
              <button
                onClick={() => dispatch(removeCart(data.id, data.size))}
                className="cursor-pointer underline text-xs hover:no-underline"
              >
                Remove
              </button>
            </div>
          </div>
          <div>
            <p className="text-xs ml-2">
              LE{" "}
              <span>
                {Number(
                  (product.price - product?.discount) * data.quantity
                ).toFixed(2)}
              </span>
            </p>
            {product?.discount > 0 && (
              <p className="text-xs">
                <del>
                  LE{" "}
                  <span>
                    {Number(product.price * data.quantity).toFixed(2)}
                  </span>
                </del>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartBox;
