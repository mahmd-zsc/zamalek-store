import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchColors } from "../../redux/apiCalls/colorApiCalls";
import { fetchProducts, fetchSaleProducts } from "../../redux/apiCalls/productApiCalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { fetchSearchProductsQuery } from "../../redux/apiCalls/searchApiCalls";

function ColorFilter() {

  const { colors } = useSelector((state) => state.color);
  const dispatch = useDispatch();
  const [selectedColors, setSelectedColors] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchColors());
    const { search } = window.location;

    const queryParams = new URLSearchParams(search);
    const colorParams = queryParams.get("colors");

    if (colorParams) {
      setSelectedColors(colorParams.split(",")); // Split the sizesParam string into an array of size ids
    }
  }, [dispatch]);

  // Function to handle color selection by name
  const handleColorClick = (colorName) => {
    setIsMounted(true);
    setSelectedColors((prevColors) => {
      if (prevColors.includes(colorName)) {
        return prevColors.filter((c) => c !== colorName);
      } else {
        return [...prevColors, colorName];
      }
    });
  };

  useEffect(() => {
    if (isMounted) {
      const updateUrlAndFetchProducts = () => {
        const queryParams = new URLSearchParams(window.location.search);
        if (selectedColors.length > 0) {
          queryParams.set("colors", selectedColors.join(","));
        } else {
          queryParams.delete("colors");
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
  }, [selectedColors, isMounted, dispatch]);

  return (
    <div className="colorFilter relative flex flex-col gap-6     overflow-hidden overflow-y-scroll h-full">
      <div
        onClick={() => setOpen(!open)}
        className=" cursor-pointer text-xs text-black flex items-center justify-between"
      >
        <p className="uppercase font-bold ">color</p>
        <div className={`plusminus ${open ? "active" : ""}`}></div>
      </div>
      <div
        style={{
          transition: "max-height 0.50s ease",
        }}
        className={` py-2 overflow-hidden ${open ? "max-h-40" : "max-h-0"}`}
      >
        <ul
          className={` flex flex-wrap    gap-10 px-1
        duration-150 ${open ? " opacity-100" : " opacity-0"}
        `}
        >
          {colors?.map((color) => (
            <li
              key={color._id}
              className={` relative w-6 h-6 flex justify-center items-center  gap-3 cursor-pointer ${
                selectedColors.includes(color.name) ? "active" : ""
              }`}
              onClick={() => handleColorClick(color.name)}
            >
              <div
                style={{ backgroundColor: color.colorCode }}
                className={`w-5 h-5 rounded-full border border-black duration-300
              ${
                selectedColors.includes(color.name)
                  ? " shadow-sm shadow-gray-600 scale-125  "
                  : ""
              }`}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ColorFilter;
