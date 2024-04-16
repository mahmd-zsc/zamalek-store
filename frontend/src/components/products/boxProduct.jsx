// components/BoxProduct.js

import React from "react";

const BoxProduct = ({ product }) => {
  // Destructure product prop
  return (
    <div className="product-item">
      <img src={product.image.url} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.price}</p>
    </div>
  );
};

export default BoxProduct;
