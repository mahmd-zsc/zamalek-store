import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchSaleProducts,
} from "../../redux/apiCalls/productApiCalls";
import { fetchSearchProductsQuery } from "../../redux/apiCalls/searchApiCalls";

function SortByFilter() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const [selectSort, setSelectSort] = useState();
  const [isMounted, setIsMounted] = useState(false);
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

  useEffect(() => {
    let { search } = window.location;
    const queryParams = new URLSearchParams(search);
    const sortParam = queryParams.get("sortBy");
    if (sortParam) {
      setSelectSort(sortParam);
    } else {
      setSelectSort("date-new-to-old");
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      const updateUrlAndFetchProducts = () => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set("sortBy", selectSort);
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
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [selectSort, isMounted]);
  return (
    <div
      className={`categoryFilter relative flex flex-col  gap-6   overflow-hidden overflow-y-scroll h-full`}
    >
      <div
        onClick={() => setOpen(!open)}
        className=" cursor-pointer text-black text-xs flex items-center justify-between"
      >
        <p className="uppercase font-bold ">sort by</p>
        <div className={`plusminus ${open ? "active" : ""}`}></div>
      </div>
      <div
        style={{
          transition: "max-height 0.50s ease",
        }}
        className={`  py-2 '
    12] overflow-hidden ${open ? " max-h-64" : "max-h-0"}`}
      >
        <ul
          className={`flex flex-col gap-4 duration-150 ${
            open ? " opacity-100" : " opacity-0"
          }`}
        >
          {sortOptions?.map((s) => (
            <li
              key={s.value}
              className={`flex items-center gap-3  cursor-pointer ${
                selectSort === s.value ? "active" : ""
              }`}
              onClick={() => {
                setSelectSort(s.value);
                setIsMounted(true);
              }}
            >
              <label className="checkBox">
                <input
                  onClick={() => {
                    setSelectSort(s.value);
                    setIsMounted(true);
                  }}
                  checked={selectSort === s.value}
                  type="checkbox"
                />
                <div className="transition"></div>
              </label>

              <span className=" text-xs font-semibold">{s.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SortByFilter;
