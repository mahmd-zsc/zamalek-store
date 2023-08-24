import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Search() {
  return (
    <div class="pt-2 relative mx-auto text-gray-600 flex-1 flex justify-center ">
      <input
        class="border-2 border-mainBlack dark:border-gray-400 bg-transparent h-10 px-5  rounded-sm text-sm focus:outline-none w-1/2 caret-mainRed duration-500 focus:w-[80%]"
        type="search"
        name="search"
        placeholder="Search"
      />
      <button type="submit" class="absolute right-0 top-0 mt-5 mr-4"></button>
    </div>
  );
}

export default Search;
