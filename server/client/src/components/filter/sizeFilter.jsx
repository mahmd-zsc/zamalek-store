import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSizes } from "../../redux/apiCalls/sizeApiCalls"; // Import fetchSizes from your size API calls
import {
  fetchProducts,
  fetchSaleProducts,
} from "../../redux/apiCalls/productApiCalls";
import { productActions } from "../../redux/slices/productSlice";
import { useLocation } from "react-router-dom";
import { fetchSearchProductsQuery } from "../../redux/apiCalls/searchApiCalls";

function SizeFilter() {
  const { filter } = useSelector((state) => state.product);
  const { sizes } = useSelector((state) => state.size); // Assuming sizes are stored in the Redux store
  const dispatch = useDispatch();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchSizes()); // Fetch sizes when component mounts
    const { search } = window.location;
    const queryParams = new URLSearchParams(search);
    const sizesParam = queryParams.get("sizes");

    if (sizesParam) {
      setSelectedSizes(sizesParam.split(",")); // Split the sizesParam string into an array of size ids
    }
  }, [dispatch]);

  const handleSizeClick = (sizeId) => {
    console.log(sizeId);
    setSelectedSizes(
      (prevSizes) =>
        prevSizes.includes(sizeId)
          ? prevSizes.filter((id) => id !== sizeId) // Remove size if already selected
          : [...prevSizes, sizeId] // Add size if not selected
    );
    setIsMounted(true); // Set isMounted to true when size is clicked
  };

  useEffect(() => {
    if (isMounted) {
      // Update URL and fetch products when sizes change
      const updateUrlAndFetchProducts = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const sizesParam = selectedSizes.join(","); // Convert the array of selected sizes to a comma-separated string
        if (sizesParam) {
          queryParams.set("sizes", sizesParam);
        } else {
          queryParams.delete("sizes");
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
  }, [selectedSizes, isMounted, dispatch]);

  return (
    <div className="sizeFilter relative flex flex-col gap-6   overflow-hidden overflow-y-scroll h-full">
      <div
        onClick={() => setOpen(!open)}
        className=" cursor-pointer text-black text-xs flex items-center justify-between"
      >
        <p className="uppercase font-bold ">size</p>
        <div className={`plusminus ${open ? "active" : ""}`}></div>
      </div>
      <div
        style={{
          transition: "max-height 0.50s ease",
        }}
        className={` py-2 overflow-hidden ${open ? " max-h-96" : "max-h-0"}`}
      >
        <ul
          className={`flex flex-col gap-4 
        duration-150 ${open ? " opacity-100" : " opacity-0"}
        `}
        >
          {sizes.map((size) => (
            <li
              key={size._id}
              className={`flex items-center gap-3 cursor-pointer  ${
                selectedSizes.includes(size.name) ? "active" : ""
              }`}
              onClick={() => handleSizeClick(size.name)}
            >
              {/* <div className="w-3 h-3 rounded-full border border-gray-700 hover:bg-gray-700 active:bg-mainRed"></div> */}
              <label className="checkBox">
                <input
                  checked={selectedSizes.includes(size.name)}
                  onClick={() => handleSizeClick(size.name)}
                  id="ch1"
                  type="checkbox"
                />
                <div className="transition"></div>
              </label>
              <span className=" text-xs">{size.name}</span>
            </li>
          ))}
        </ul>{" "}
      </div>
    </div>
  );
}

export default SizeFilter;
