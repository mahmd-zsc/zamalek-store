import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchSaleProducts,
} from "../../redux/apiCalls/productApiCalls";
import { productActions } from "../../redux/slices/productSlice";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchSearchProductsQuery } from "../../redux/apiCalls/searchApiCalls";

function PriceFilter() {
  let { filter } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(true);
  const filterOptions = [
    { label: "to EGY50", min: 0, max: 50 },
    { label: "EGY50 - EGY100", min: 50, max: 100 },
    { label: "EGY100 - EGY300", min: 100, max: 300 },
    { label: "EGY400 - EGY1000", min: 400, max: 1000 },
    { label: "EGY1000 - EGY1500", min: 10000, max: 2000 },
    { label: "EGY2000 or more", min: 2000 },
  ];
  useEffect(() => {
    const { search } = window.location;
    const queryParams = new URLSearchParams(search);
    const minPriceParam = queryParams.get("minPrice");
    const maxPriceParam = queryParams.get("maxPrice");

    if (minPriceParam) {
      setMinPrice(minPriceParam);
    }
    if (maxPriceParam) {
      setMaxPrice(maxPriceParam);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      const updateUrlAndFetchProducts = () => {
        const queryParams = new URLSearchParams(window.location.search);

        if (minPrice) {
          queryParams.set("minPrice", minPrice);
        } else {
          queryParams.delete("minPrice");
        }

        if (maxPrice) {
          queryParams.set("maxPrice", maxPrice);
        } else {
          queryParams.delete("maxPrice");
        }

        window.history.replaceState(null, null, `?${queryParams.toString()}`);
        if (window.location.pathname.includes("sale")) {
          dispatch(fetchSaleProducts());
        } else if (window.location.pathname.includes("search")) {
          dispatch(fetchSearchProductsQuery())
        } else {
          dispatch(fetchProducts());
        }
        dispatch(productActions.setFilter(!filter));
      };

      const timeoutId = setTimeout(updateUrlAndFetchProducts, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [minPrice, maxPrice]);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    setIsMounted(true);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    setIsMounted(true);
  };

  const toggleOpenPrice = () => {
    setOpen((prevOpenPrice) => !prevOpenPrice);
  };

  return (
    <div
      className={` coolInputs relative flex max-w-full flex-col gap-6    h-full   `}
    >
      <div
        onClick={() => setOpen(!open)}
        className=" cursor-pointer text-black flex items-center justify-between"
      >
        <p className="uppercase font-bold text-xs">Price</p>
        <div className={`plusminus  ${open ? "active" : ""}`}></div>
      </div>
      <div
        style={{
          transition: "max-height 0.50s ease",
        }}
        className={` py-2 overflow-hidden ${open ? "max-h-20" : "max-h-0"}`}
      >
        <div
          className={`flex gap-4 duration-150 ${
            open ? " opacity-100" : " opacity-0"
          }    `}
        >
          <input
            placeholder="min"
            onChange={handleMinPriceChange}
            type="number"
            id="minPrice"
            value={minPrice}
            className={`w-1/3 border border-gray-500 text-gray-500 rounded px-3 py-2 outline-none`}
            style={{ MozAppearance: "none", appearance: "none" }}
          />
          <input
            placeholder="max"
            onChange={handleMaxPriceChange}
            type="number"
            id="maxPrice"
            value={maxPrice}
            className="w-1/3 border border-gray-500 text-gray-500 rounded px-3 py-2 outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default PriceFilter;
