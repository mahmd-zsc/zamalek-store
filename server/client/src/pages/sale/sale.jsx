import React, { useEffect, useState } from "react";
import Filter from "../../components/filter/filter";
import Products from "../../components/products/products";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchSaleProducts,
} from "../../redux/apiCalls/productApiCalls";
import { useLocation } from "react-router-dom";
import SortBy from "../../components/sortBy/sortBy";
import settingImg from "../../images/icons/settings.png";
import { productActions } from "../../redux/slices/productSlice";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import BadRequest from "../../components/badRequest/badRequest";
function Sale() {
  let { filter, saleProducts, products, error } = useSelector(
    (state) => state.product
  );
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSaleProducts());
  }, [filter]);
  let settingHandler = () => {
    dispatch(productActions.SetSetting(true));
  };
  return (
    <div className="pt-24    bg-white lg:mx-10 md:mx-8 sm:mx-6 mx-4  font-sans min-h-screen   ">
      {(saleProducts?.data?.length > 0 || saleProducts?.data?.length > 0) && (
        <div className=" lg:flex items-center gap-6 hidden sticky top-0 bg-white z-10">
          <Breadcrumbs />
          <div className=" flex-1 items-center justify-between py-6    flex px-2  ">
            <SortBy />
            <p className="capitalize text-xs">
              <span>{saleProducts.totalCount}</span> products
            </p>
          </div>
        </div>
      )}
      {(saleProducts?.data?.length > 0 || saleProducts?.data?.length > 0) && (
        <div className="z-10 items-center justify-between py-6 sticky top-0 bg-white flex lg:hidden  ">
          <Breadcrumbs />

          <img
            onClick={settingHandler}
            className="w-5 cursor-pointer scale-105 duration-200 "
            src={settingImg}
            alt=""
          />
        </div>
      )}
      <div className="flex gap-6">
        <div className=" hidden lg:block w-[20%]  ">{!error && <Filter />}</div>

        <div className=" flex-1   ">
          {products && products.data && <Products />}
          {error && <BadRequest />}{" "}
        </div>
      </div>
    </div>
  );
}

export default Sale;
