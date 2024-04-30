import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../redux/apiCalls/brandApiCalls";
import {
  fetchProducts,
  fetchSaleProducts,
} from "../../redux/apiCalls/productApiCalls";
import { useLocation } from "react-router-dom";
import { fetchSearchProductsQuery } from "../../redux/apiCalls/searchApiCalls";

function BrandFilter() {
  const { brands } = useSelector((state) => state.brand);
  const dispatch = useDispatch();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [open, setOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    dispatch(fetchBrands());
    const { search } = window.location;
    const queryParams = new URLSearchParams(search);
    const brandParam = queryParams.get("brand");

    if (brandParam) {
      setSelectedBrands(brandParam.split(",")); // Split the sizesParam string into an array of size ids
    }
  }, [dispatch]);
  const handleBrandClick = (brandName) => {
    setIsMounted(true);
    setSelectedBrands((prevBrands) => {
      if (prevBrands.includes(brandName)) {
        return prevBrands.filter((b) => b !== brandName);
      } else {
        return [...prevBrands, brandName];
      }
    });
  };

  useEffect(() => {
    if (isMounted) {
      const updateUrlAndFetchProducts = () => {
        const queryParams = new URLSearchParams(window.location.search);
        if (selectedBrands.length > 0) {
          queryParams.set("brand", selectedBrands.join(","));
        } else {
          queryParams.delete("brand");
        }
        window.history.replaceState(null, null, `?${queryParams.toString()}`);
        if (window.location.pathname.includes("sale")) {
          dispatch(fetchSaleProducts());
        } else if (window.location.pathname.includes("search")) {
          dispatch(fetchSearchProductsQuery())
        } else {
          dispatch(fetchProducts());
        }
      };
      const timeoutId = setTimeout(updateUrlAndFetchProducts, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedBrands, dispatch, isMounted]);

  return (
    <div className="brandFilter relative flex flex-col gap-6 overflow-hidden overflow-y-scroll h-full">
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer text-xs text-black flex items-center justify-between"
      >
        <p className="uppercase font-bold ">Brand</p>
        <div className={`plusminus ${open ? "active" : ""}`}></div>
      </div>
      <div
        style={{
          transition: "max-height 0.50s ease",
        }}
        className={` py-2 overflow-hidden ${open ? "max-h-48" : "max-h-0"}`}
      >
        <ul
          className={`flex flex-col gap-4 duration-150 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          {brands?.map((brand) => (
            <li
              key={brand._id}
              className={`flex items-center gap-3 cursor-pointer ${
                selectedBrands.includes(brand.name) ? "active" : ""
              }`}
              onClick={() => handleBrandClick(brand.name)}
            >
              <label className="checkBox">
                <input
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => handleBrandClick(brand.name)}
                  type="checkbox"
                />
                <div className="transition"></div>
              </label>
              <span className=" text-xs">{brand.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BrandFilter;
