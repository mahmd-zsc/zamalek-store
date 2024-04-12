// components/Products.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../redux/slices/productSlice";
import { Link } from "react-router-dom";
import BoxProduct from "./boxProduct"; // Importing BoxProduct component

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  console.log(products);
  useEffect(() => {
    dispatch(fetchProducts("http://localhost:3000/api/products"));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderProducts = () => {
    if (!products || !products.data || products.data.length === 0) {
      return <div>No products found.</div>;
    }

    return (
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
    );
  };

  return renderProducts();
};

export default Products;
