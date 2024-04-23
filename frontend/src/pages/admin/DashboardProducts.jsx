import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/apiCalls/productApiCalls";
import ProductTable from "../../components/productTable/productTable";
import Loading from "../loading/loading";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../utils/useScrollToTop ";
import AOS from "aos";
import "aos/dist/aos.css";
function DashboardProducts() {
  useScrollToTop();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = "visible";
  }, []);
  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);
  return (
    <div className=" h-full">
      {loading && (
        <div>
          {/* <Loading /> */}
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "10px solid rgb(255, 0, 0);",
              borderTopColor: "white",
              animation: "loader 0.60s linear infinite",
              borderRadius: "50%",
            }}
            className="circle-loading absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 m-auto"
          ></div>
        </div>
      )}
      {error && <div>{error}</div>}
      {products &&
        products.data &&
        products.data.length > 0 &&
        !loading &&
        !error && (
          <div className="  ">
            <ProductTable />

            <button
              onClick={() => navigate("add-product")}
              className=" mx-10 my-5  bg-mainRed opacity-90 hover:opacity-100 duration-200 px-4 py-2 rounded-md mt-2 text-white "
            >
              <span className="button-text">add product</span>
            </button>
          </div>
        )}
      {products &&
        products.data &&
        products.data.length === 0 &&
        !loading &&
        !error && (
          <div
            data-aos="fade-up"
            className=" flex flex-col justify-center items-center h-full"
          >
            <p className=" text-2xl">there is no any products </p>
            <button
              onClick={() => navigate("add-product")}
              className=" mx-10 my-5  bg-mainRed opacity-90 hover:opacity-100 duration-200 px-4 py-2 rounded-md mt-2 text-white "
            >
              <span className="button-text">add product</span>
            </button>
          </div>
        )}
    </div>
  );
}

export default DashboardProducts;
