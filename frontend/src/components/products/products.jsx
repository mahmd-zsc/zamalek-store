// components/Products.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BoxProduct from "./boxProduct"; // Importing BoxProduct component
import { fetchProducts } from "../../redux/apiCalls/productApiCalls";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  console.log(products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    products.data && (
      <div className="flex-1 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.data.map((product) => (
          <Link
            key={product.id}
            to={`/shop/products/${product.name.replace(/\s+/g, "-")}`}
          >
            <BoxProduct product={product} /> {/* Pass product as prop */}
          </Link>
        ))}
      </div>
    )
  );
};

export default Products;
