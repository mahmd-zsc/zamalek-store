import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/apiCalls/productApiCalls";
import ProductTable from "../../components/productTable/productTable";
import Loading from "../loading/loading";
import { Link, NavLink, useNavigate } from "react-router-dom";

function DashboardProducts() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  let navigate = useNavigate();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  return (
    <div>
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      {error && <div>{error}</div>}
      {products && products.data && products.data.length > 0 && (
        <div className="  overflow-y-scroll ">
          <ProductTable />

          <button
            onClick={() => navigate("add-product")}
            className=" mx-4 my-5 shopNowSecondBlack bg-black px-4 py-2 rounded-2xl mt-2 border-2 border-black"
          >
            <span className="button-text">add product</span>
            <div className="fill-container"></div>
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardProducts;
