import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "../../redux/slices/dashboardSlice";
import ProductTable from "../../components/productTable/productTable";
import DeleteCard from "../../components/deleteCard/deleteCard";
import { fetchProducts } from "../../redux/apiCalls/productApiCalls";
import DashboardLoading from "../../components/dashboardLoading/dashboardLoading";
import Pagination from "../../components/pagination/pagination";

function DashboardProducts() {
  let dispatch = useDispatch();

  let { productCreatedMessage, products, loading, error } = useSelector(
    (state) => state.product
  );
  let { fullSidebar } = useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(fetchProducts());
    setTimeout(() => {
      dispatch(dashboardActions.setAction(""));
    }, 1000);
  }, [productCreatedMessage]);
  return (
    <div className=" flex h-full flex-col gap-6  custom-scrollbar pb-24">
      <div className=" flex items-center gap-4 text-gray-900 ">
        <FontAwesomeIcon
          onClick={() =>
            dispatch(dashboardActions.setFullSidebar(!fullSidebar))
          }
          size="2xl"
          icon={faBars}
          className=" cursor-pointer"
        />
        <h2 className=" font-bold text-2xl">products</h2>
      </div>
      {loading ? (
        <DashboardLoading />
      ) : (
        <div className=" flex-1  ">
          {products && products.data && products.data.length > 0 && !error ? (
            <>
              <ProductTable />
              <Pagination products={products} loading={loading} />
            </>
          ) : (
            <div className="h-full m-4 px-6 bg-gray-2 rounded-lg flex justify-center items-center flex-col flex-1 text-gray-500 superFont">
              <p className="text-lg">There are no products available</p>
              <button
                onClick={() =>
                  dispatch(dashboardActions.setAction("create-product"))
                }
                className="bg-mainRed text-white p-2 rounded-lg mt-2"
              >
                add product
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardProducts;
