import React, { useState } from "react";

const BoxProduct = ({ product }) => {
  // Format price to always display with two decimal places
  const formattedPrice = Number(product.price - product.discount).toFixed(2);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log(true);
  };

  return (
    <>
      <div
        className={`flex h-full flex-col gap-4 rounded-md overflow-hidden py-4 roboto-bold  card bg-white ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          className="flex-1 w-full object-cover duration-300"
          src={product.image.url}
          alt={product.name}
          onLoad={handleImageLoad}
          style={{ imageRendering: "auto" }}
        />

        <div className="px-4">
          <div className="w-full h-px bg-gray-300 rounded-full"></div>
        </div>
        <div className="px-10 flex flex-col gap-2 text-center">
          <p className="capitalize text-sm">{product.title}</p>
          <div className=" h-10 flex flex-col">
            <p className="font-thin text-xs opacity-80 ">
              LE <span>{formattedPrice}</span> EGP
            </p>
            {product.discount ? (
              <p className="font-thin text-xs opacity-80">
                <del>
                  LE <span> {product.price}</span> EGP
                </del>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default BoxProduct;
