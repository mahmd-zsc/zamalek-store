import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import BoxProduct from "./boxProduct"; // Importing BoxProduct component
import { fetchProducts } from "../../redux/apiCalls/productApiCalls";
import Pagination from "../pagination/pagination";
import Loading from "./loading";

const Products = () => {
  const location = useLocation(); // Get current location
  const [isSalePage, setIsSalePage] = useState();
  const { products, saleProducts, loading, error } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    setIsSalePage(location.pathname.includes("sale"));
  }, [location.pathname]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="grid gap-y-8 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-10 p-2">
            {(isSalePage ? saleProducts : products)?.data?.map((product) => (
              <Link
                key={product.id}
                to={`/shop/products/${product.title.replace(/\s/g, "-")}`}
              >
                <BoxProduct product={product} /> {/* Pass product as prop */}
              </Link>
            ))}
          </div>
          {products?.data?.length > 0 ||
            (saleProducts?.data?.length > 0 && <Pagination />)}
        </div>
      )}
    </>
  );
};

export default Products;