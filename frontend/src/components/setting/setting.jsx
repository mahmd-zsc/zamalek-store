import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../filter/filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { productActions } from "../../redux/slices/productSlice";

function Setting() {
  let { setting } = useSelector((state) => state.product);
  let dispatch = useDispatch();
  useEffect(() => {
    if (setting) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [setting]);
  return (
    <div
      className={` fixed lg:hidden    bg-white h-screen custom-scrollbar right-0 top-0 z-50 duration-500 overflow-hidden overflow-y-scroll  ${
        setting ? "w-full px-6 py-6" : "w-0"
      } `}
    >
      {setting && (
        <>
          <FontAwesomeIcon
            icon={faTimes}
            size="lg"
            className=" cursor-pointer text-gray-600 hover:text-gray-900 duration-500 rotate-90 hover:rotate-0"
            onClick={() => dispatch(productActions.SetSetting(false))}
          />
          <Filter />
        </>
      )}
    </div>
  );
}

export default Setting;
