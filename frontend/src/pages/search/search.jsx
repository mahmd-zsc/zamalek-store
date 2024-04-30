import React, { useEffect, useState } from "react";
import Filter from "../../components/filter/filter";
import Products from "../../components/products/products";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/apiCalls/productApiCalls";
import SortBy from "../../components/sortBy/sortBy";
import settingImg from "../../images/icons/settings.png";
import { productActions } from "../../redux/slices/productSlice";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import {
  fetchSearchProducts,
  fetchSearchProductsQuery,
} from "../../redux/apiCalls/searchApiCalls";
import { Link, useLocation } from "react-router-dom";
import BoxProduct from "../../components/products/boxProduct";
import Pagination from "../../components/pagination/pagination";
import { searchActions } from "../../redux/slices/searchSlice";
import SearchInput from "./searchInput";
function Search() {
  let location = useLocation();
  let { products, error, loading } = useSelector((state) => state.search);
  let { filter } = useSelector((state) => state.product);
  let [words, setWords] = useState(
    new URLSearchParams(location.search).get("search")
  );
  const [isMounted, setIsMounted] = useState(words ? true : false);
  let dispatch = useDispatch();
  useEffect(() => {
    if (isMounted) {
      //   dispatch(fetchSearchProducts(words));
      dispatch(fetchSearchProductsQuery(words));
    }
  }, [words, isMounted]);
  let settingHandler = () => {
    dispatch(productActions.SetSetting(true));
  };

  return (
    <div className="pt-24    bg-white lg:mx-10 md:mx-8 sm:mx-6 mx-4  font-sans min-h-screen   ">
      <SearchInput
        words={words}
        setWords={setWords}
        setIsMounted={setIsMounted}
      />
      {products?.data?.length > 0 && (
        <div className="text-center py-10">
          <p>Your search for "{words}" revealed the following:</p>
        </div>
      )}
      <div>
        {error && (
          <div className="text-center py-10">
            <p>{error.massage}</p>
          </div>
        )}
        {products?.data?.length > 0 && (
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
        {products?.data?.length > 0 && (
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
        {products?.data?.length > 0 && (
          <div className="flex gap-6">
            <div className=" hidden lg:block w-[20%]   ">
              <Filter />
            </div>

            <div className=" flex-1   ">
              <div>
                <div className="grid gap-y-8 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-10 p-2">
                  {products?.data?.map((product) => (
                    <Link
                      key={product.id}
                      to={`/shop/products/${product.title.replace(/\s/g, "-")}`}
                    >
                      <BoxProduct product={product} />{" "}
                      {/* Pass product as prop */}
                    </Link>
                  ))}
                </div>
                {products?.data?.length > 0 && (
                  <Pagination products={products} loading={loading} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
