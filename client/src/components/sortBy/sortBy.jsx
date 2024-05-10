import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import "./sortBy.css";
import { useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchSaleProducts,
} from "../../redux/apiCalls/productApiCalls";
import { useLocation } from "react-router-dom";

function SortBy() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();
  const [selectSort, setSelectSort] = useState();
  const dropdownRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    let { search } = window.location;
    const queryParams = new URLSearchParams(search);
    const sortParam = queryParams.get("sortBy");
    if (sortParam) {
      setSelectSort(sortParam);
    } else {
      setSelectSort("date-new-to-old");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isMounted) {
      const updateUrlAndFetchProducts = () => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set("sortBy", selectSort);
        window.history.replaceState(null, null, `?${queryParams.toString()}`);
        if (location.pathname.includes("sale")) {
          dispatch(fetchSaleProducts());
        } else {
          dispatch(fetchProducts());
        }
      };

      const timeoutId = setTimeout(updateUrlAndFetchProducts, 500);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [selectSort, isMounted]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const sortOptions = [
    {
      name: "Date, new to old",
      value: "date-new-to-old",
    },
    {
      name: "Date, old to new",
      value: "date-old-to-new",
    },
    {
      name: "Alphabetically, A-Z",
      value: "alphabetically-a-z",
    },
    {
      name: "Alphabetically, Z-A",
      value: "alphabetically-z-a",
    },
    {
      name: "Price, low to high",
      value: "price-low-to-high",
    },
    {
      name: "Price, high to low",
      value: "price-high-to-low",
    },
  ];

  return (
    <div className="relative  " ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-end gap-2 text-xs capitalize cursor-pointer w-fit"
      >
        <span>Sort by</span>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
      <div
        style={{
          transition: "max-height 0.50s ease",
        }}
        className={`absolute left-0 top-6 bg-white shadow rounded-lg w-40 border border-black overflow-hidden  ${
          open ? "max-h-64 p-2 opacity-100" : "max-h-0 delay-200 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2">
          {sortOptions.map((s, index) => (
            <li
              key={index}
              className={`relative cursor-pointer flex items-center gap-1 overflow-hidden`}
              onClick={() => {
                setSelectSort(s.value);
                setIsMounted(true);
              }}
            >
              <div
                className={`relative w-2 h-2 border-gray-700  rounded-full  ${
                  selectSort === s.value ? " border-2" : " border"
                }`}
              ></div>
              <span className="text-xs">{s.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SortBy;
