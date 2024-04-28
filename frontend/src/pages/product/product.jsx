import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../redux/apiCalls/productApiCalls";
import { fetchSizes } from "../../redux/apiCalls/sizeApiCalls";
import "./product.css";
import Loading from "./loading";
import RelatedProducts from "./relatedProducts";
function Product() {
  let { product, loading } = useSelector((state) => state.product);
  let { sizes } = useSelector((state) => state.size);
  let [currentSize, setCurrentSize] = useState();
  let { id } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(fetchSizes());
  }, [id]);
  useEffect(() => {
    setCurrentSize(product?.sizes[0]);
  }, [product]);
  let sizeHandler = (event) => {
    if (product.sizes.includes(event._id)) {
      setCurrentSize(event._id);
    }
  };
  // Calculate the price-off-amount
  const priceOffAmount = Math.floor(Number(product?.price - product?.discount));

  // Calculate the percentage discount
  const percentageDiscount = (
    (product?.discount / product?.price) *
    100
  ).toFixed(0);
  console.log(currentSize);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        product &&
        sizes && (
          <div className=" container min-h-screen md:pt-40 pt-20 pb-20">
            <div className="flex flex-col lg:flex-row w-full overflow-hidden">
              <img
                className=" flex-1 md:px-20 lg:px-0 lg:w-1/2"
                src={product?.image?.url}
                alt=""
              />
              <div className=" flex flex-col gap-4 flex-1">
                <h3 className="text-3xl bo">{product?.title}</h3>
                <p>
                  <span className=" font-bold">
                    LE <span className=" font-medium">{priceOffAmount}</span>{" "}
                    EGP{" "}
                  </span>
                  {product?.discount && (
                    <>
                      <span>
                        <del>LE {Number(product?.price).toFixed(2)} EGP</del>
                      </span>{" "}
                      <span className=" ml-2  bg-red-500 text-white py-1 px-2 rounded-md text-xs">
                        {" "}
                        sale -save {percentageDiscount}%
                      </span>
                    </>
                  )}
                </p>
                <div className=" flex flex-col gap-2 mt-5 ">
                  <p>size</p>
                  <ul className=" flex gap-2 items-center">
                    {sizes?.map((size) => (
                      <li
                        onClick={() => sizeHandler(size)}
                        className={`relative border border-gray-400  px-2 py-1 hover:border-gray-900 duration-300 cursor-pointer ${
                          size._id === currentSize ? "active" : ""
                        }`}
                      >
                        <span className=" text-sm">{size.name}</span>
                        <div
                          className={`absolute w-px h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-400 rotate-45 ${
                            product.sizes.includes(size._id) ? "hidden" : ""
                          }`}
                        ></div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className=" flex  items-center gap-8 mt-5">
                  <button className=" blackBottom flex-1 h-full ">
                    Add to Cart
                  </button>
                  <button className=" whiteBottom flex-1 h-full ">
                    Buy Now
                  </button>
                </div>
                <div>
                  {/* <p>{product.description}</p> */}
                  <p className=" text-sm leading-6  text-gray-600">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Corrupti rem in reprehenderit pariatur enim voluptatem error
                    iusto eveniet possimus voluptates, velit est, facere
                    doloremque voluptatibus unde! Ab numquam quaerat voluptate
                    molestias debitis optio, nisi ipsum harum itaque atque eos
                    asperiores eum minus, aut quas! Molestias libero voluptates
                    iusto corrupti nam non quidem consequatur fugit, officiis
                    modi nisi vero hic culpa, nobis unde eligendi alias omnis
                    facilis? Incidunt officiis aperiam molestias sunt fugiat,
                    hic consequatur id ex distinctio cumque obcaecati dolore,
                    excepturi adipisci nostrum, vero nam. Officia libero est
                    saepe minima sequi dolorem voluptatem mollitia iusto
                    laborum, quas adipisci, quibusdam exercitationem.
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
