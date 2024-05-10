import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProduct,
  getProductById,
} from "../../redux/apiCalls/productApiCalls";
import { fetchSizes } from "../../redux/apiCalls/sizeApiCalls";
import { addToCart } from "../../redux/apiCalls/cartApiCall";
import Loading from "./loading";
import NotFound from "../notFound/notFound";
import RelatedProducts from "./relatedProducts";
import { ScrollToTop } from "../../utils/ScrollToTop ";
import { cartActions } from "../../redux/slices/cartSlice";
import "./product.css";

function Product() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const { sizes } = useSelector((state) => state.size);
  const [imageLoading, setImageLoading] = useState(false);
  const [currentSize, setCurrentSize] = useState();

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(fetchSizes());
    ScrollToTop();
  }, [dispatch, id]);

  useEffect(() => {
    setCurrentSize(product?.sizes[0]);
  }, [product]);

  const sizeHandler = (selectedSize) => {
    if (product.sizes.includes(selectedSize._id)) {
      setCurrentSize(selectedSize._id);
    }
  };

  const priceOffAmount = Math.floor(Number(product?.price - product?.discount));
  const percentageDiscount = (
    (product?.discount / product?.price) *
    100
  ).toFixed(0);

  const cartHandler = () => {
    dispatch(addToCart({ id: product._id, size: currentSize, quantity: 1 }));
    dispatch(cartActions.setMakeChange(true));
  };

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        product &&
        !loading && (
          <div className="container min-h-screen md:pt-40 pt-20 pb-20">
            <div className="flex flex-col lg:flex-row w-full overflow-hidden justify-between">
              <div className="flex justify-center items-center lg:w-1/2">
                <img
                  className=" "
                  src={product?.image?.url}
                  alt=""
                  onLoad={() => setImageLoading(true)}
                />
              </div>

              <div className="flex flex-col gap-4  lg:w-1/2">
                <h3 className="text-3xl bo">{product?.title}</h3>
                <p>
                  <span className="font-bold">
                    LE <span className="font-medium">{priceOffAmount}</span> EGP{" "}
                  </span>
                  {product?.discount > 0 && (
                    <>
                      <span>
                        <del>LE {Number(product?.price).toFixed(2)} EGP</del>
                      </span>{" "}
                      <span className="ml-2 bg-red-500 text-white py-1 px-2 rounded-md text-xs">
                        {" "}
                        sale -save {percentageDiscount}%
                      </span>
                    </>
                  )}
                </p>
                {product?.sizes.length > 0 && (
                  <div className="flex flex-col gap-2 mt-5">
                    <p>size</p>
                    <ul className="products-ul flex gap-2 items-center">
                      {sizes?.map((size) => (
                        <li
                          key={size._id}
                          onClick={() => sizeHandler(size)}
                          className={`relative border border-gray-400 px-2 py-1 hover:border-gray-900 duration-300 cursor-pointer ${
                            size._id === currentSize ? "active" : ""
                          }`}
                        >
                          <span className="text-sm">{size.name}</span>
                          <div
                            className={`absolute w-px h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-400 rotate-45 ${
                              product.sizes.includes(size._id) ? "hidden" : ""
                            }`}
                          ></div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex items-center gap-8 mt-5">
                  <button
                    onClick={cartHandler}
                    className="blackBottom flex-1 h-full"
                  >
                    Add to Cart
                  </button>
                  <button className="whiteBottom flex-1 h-full">Buy Now</button>
                </div>
                <div>
                  {/* <p>{product.description}</p> */}
                  <p className="text-sm leading-6 text-gray-600">
                    {product?.description}
                  </p>
                </div>
              </div>
            </div>
            <RelatedProducts />
          </div>
        )
      )}
    </div>
  );
}

export default Product;
