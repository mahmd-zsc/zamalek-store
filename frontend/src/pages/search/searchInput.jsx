import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSearchProductsQuery } from "../../redux/apiCalls/searchApiCalls";
function SearchInput({ words, setWords }) {
  let [inputValue, setInputValue, setIsMounted] = useState(words);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue?.trim().length > 0) {
      navigate("/search?search=" + inputValue);
      setWords(inputValue);
      dispatch(fetchSearchProductsQuery());
    }
  };
  return (
    <div class=" flex flex-col justify-center items-center mt-20 mb-4 text-gray-900">
      <form
        onSubmit={handleSubmit}
        className=" w-[90%] md:w-[70%] lg:w-1/2 py-4 flex items-center justify-between"
      >
        <input
          className=" flex-1  placeholder:text-gray-900  text-md md:text-lg font-bold    outline-none"
          type="text"
          placeholder="Search Our Store"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <FontAwesomeIcon
          className=" cursor-pointer font-thin sm:text-lg md:text-2xl "
          // onClick={searchHandlerSubmit}
          icon={faMagnifyingGlass}
        />
      </form>
      <div className="  w-[90%] md:w-[70%] lg:w-1/2 h-px  bg-gray-900"></div>
    </div>
  );
}

export default SearchInput;
