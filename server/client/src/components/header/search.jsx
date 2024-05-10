import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessKing,
  faMagnifyingGlass,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BoxProduct from "../products/boxProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchProducts } from "../../redux/apiCalls/searchApiCalls";

function Search({ showSearch, setShowSearch }) {
  let { products, loading, error } = useSelector((state) => state.search);
  let location = useLocation();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [write, setWrite] = useState(false);
  let [words, setWords] = useState("");
  useEffect(() => {
    // Apply styles to prevent scrolling
    if (showSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showSearch]);
  let searchHandlerSubmit = (e) => {
    e.preventDefault();
    if (words?.trim().length > 0) {
      navigate("/search?search=" + words);
      setShowSearch(false);
      setWords(""); // Passing an empty string to ensure words is defined
    }
  };
  let changeWordsHandler = (e) => {
    setWords(e.target.value);
    if (!write) {
      setWrite(true);
    }
  };
  useEffect(() => {
    if (write && words.trim().length > 0) {
      dispatch(fetchSearchProducts(words));
      console.log(products);
    }
  }, [words]);
  useEffect(() => {
    setWords("");
  }, [location.pathname]);

  return (
    <div
      className={`search-container bg-white left-0 top-0  duration-500 overflow-hidden overflow-y-scroll w-full  ${
        showSearch ? "h-screen  lg:px-10 md:px-8 sm:px-6 px-4   pt-6" : "h-0"
      }     absolute `}
    >
      <div className={` ${showSearch ? "block" : "hidden"}`}>
        <div className=" flex justify-end">
          <FontAwesomeIcon
            icon={faTimes}
            size="lg"
            className=" cursor-pointer text-gray-600 hover:text-gray-900 duration-500 rotate-90 hover:rotate-0   "
            onClick={() => {
              setShowSearch(false);
              setWords("");
            }}
          />
        </div>
        <div>
          <form
            className="mt-10 md:mt-20 flex items-center text-gray-800 "
            onSubmit={searchHandlerSubmit}
            action=""
          >
            <input
              className="   w-full  outline-none   placeholder:text-gray-600  sm:text-lg md:text-2xl"
              placeholder="Search Our Store  "
              type="text"
              name=""
              id=""
              value={words}
              onChange={changeWordsHandler}
            />
            <FontAwesomeIcon
              className=" cursor-pointer sm:text-lg md:text-2xl "
              onClick={searchHandlerSubmit}
              icon={faMagnifyingGlass}
            />
          </form>
          {words && products?.data?.length > 0 && !loading && write && (
            <div className=" flex flex-col gap-4">
              <div className="grid gap-y-8 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-10 p-2 mt-10">
                {products?.data.slice(0, 8).map((product) => (
                  <div
                    onClick={() => {
                      navigate(
                        `/shop/products/${product.title.replace(/\s/g, "-")}`
                      );
                      setShowSearch(false);
                      setWords("");
                    }}
                    className=" cursor-pointer"
                  >
                    <BoxProduct key={product.id} product={product} />
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  navigate("/search?search=" + words);
                  setShowSearch(false);
                }}
                className="shopNowSecondBlack bg-black px-4 py-2 rounded-2xl mt-2 border-2 border-black w-fit m-auto mb-4"
              >
                <span className="button-text">view all</span>
                <div className="fill-container"></div>
              </button>{" "}
            </div>
          )}
          {words && error && !loading && write && (
            <div className=" flex mt-60 justify-center items-center">
              {error.massage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
