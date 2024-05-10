import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../redux/slices/productSlice";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCalls";
import {
  fetchProducts,
  fetchSaleProducts,
} from "../../redux/apiCalls/productApiCalls";
import "./filter.css";
import { fetchSearchProductsQuery } from "../../redux/apiCalls/searchApiCalls";
function CategoryFilter() {
  const { filter } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchCategories());
    const { search } = window.location;
    const queryParams = new URLSearchParams(search);
    const categoryParams = queryParams.get("category");

    if (categoryParams) {
      setSelectedCategories(categoryParams.split(",")); // Split the sizesParam string into an array of size ids
    }
  }, [dispatch]);
  // Function to handle category selection by name
  const handleCategoryClick = (categoryName) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryName)) {
        return prevCategories.filter((c) => c !== categoryName);
      } else {
        return [...prevCategories, categoryName];
      }
    });

    setIsMounted(true);
  };

  useEffect(() => {
    if (isMounted) {
      const updateUrlAndFetchProducts = () => {
        const queryParams = new URLSearchParams(window.location.search);
        if (selectedCategories.length > 0) {
          queryParams.set("category", selectedCategories.join(","));
        } else {
          queryParams.delete("category");
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
  }, [selectedCategories, dispatch, isMounted]);

  return (
    <div
      className={`categoryFilter relative flex flex-col  gap-6   overflow-hidden overflow-y-scroll h-full`}
    >
      <div
        onClick={() => setOpen(!open)}
        className=" cursor-pointer text-black text-xs flex items-center justify-between"
      >
        <p className="uppercase font-bold ">category</p>
        <div className={`plusminus ${open ? "active" : ""}`}></div>
      </div>
      <div
        style={{
          transition: "max-height 0.50s ease",
        }}
        className={`  py-2 '
        12] overflow-hidden ${open ? " max-h-60" : "max-h-0"}`}
      >
        <ul
          className={`flex flex-col gap-4 duration-150 ${
            open ? " opacity-100" : " opacity-0"
          }`}
        >
          {categories?.map((category) => (
            <li
              key={category._id}
              className={`flex items-center gap-3  cursor-pointer ${
                selectedCategories.includes(category.name) ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <label className="checkBox">
                <input
                  onClick={() => handleCategoryClick(category.name)}
                  checked={selectedCategories.includes(category.name)}
                  type="checkbox"
                />
                <div className="transition"></div>
              </label>

              <span className=" text-xs font-semibold">{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryFilter;
