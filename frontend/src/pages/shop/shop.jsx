import React, { useEffect, useState } from "react";
import Filter from "../../components/filter/filter";
import Products from "../../components/products/products";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/apiCalls/productApiCalls";
import SortBy from "../../components/sortBy/sortBy";
import settingImg from "../../images/icons/settings.png";
import { productActions } from "../../redux/slices/productSlice";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
function Shop() {
  let { filter, products, saleProducts } = useSelector(
    (state) => state.product
  );
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [filter]);
  let settingHandler = () => {
    dispatch(productActions.SetSetting(true));
  };
  return (
    <div className="pt-24    bg-white lg:mx-10 md:mx-8 sm:mx-6 mx-4  font-sans min-h-screen   ">
      {(products?.data?.length > 0 || saleProducts?.data?.length > 0) && (
        <div className=" lg:flex items-center gap-6 hidden sticky top-0 bg-white z-10">
          <Breadcrumbs />
          <div className=" flex-1 items-center justify-between py-6    flex px-2  ">
            <SortBy />
            <p className="capitalize text-xs">
              <span>{products.totalCount}</span> products
            </p>
          </div>
        </div>
      )}
      {(products?.data?.length > 0 || saleProducts?.data?.length > 0) && (
        <div className="z-10 items-center justify-between py-6 sticky top-0 bg-white flex lg:hidden  ">
          <Breadcrumbs />

          <img
            onClick={settingHandler}
            className="w-5 cursor-pointer scale-105 duration-200 "
            src={settingImg}
            alt="settingImg"
          />
        </div>
      )}
      <div className="flex gap-6">
        <div className=" hidden lg:block w-[20%]   ">
          <Filter />
        </div>

        <div className=" flex-1   ">
          <div className="">
            <Products />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;