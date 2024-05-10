import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dashboardActions } from "../../redux/slices/dashboardSlice";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { fetchBrands } from "../../redux/apiCalls/brandApiCalls";
import ActionOfBrand from "../../components/actionOfBrand/actionOfBrand";

function DashboardSize() {
  const { brands, loading, error } = useSelector((state) => state.brand);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);
  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "...";
  };
  let { fullSidebar } = useSelector((state) => state.dashboard);

  return (
    <div className="h-full flex flex-col gap-6  custom-scrollbar pb-24">
      {error && <div>{error}</div>}
      <div className=" flex items-center gap-4 text-gray-900 ">
        <FontAwesomeIcon
          onClick={() =>
            dispatch(dashboardActions.setFullSidebar(!fullSidebar))
          }
          size="2xl"
          icon={faBars}
          className=" cursor-pointer"
        />
        <h2 className=" font-bold text-2xl">Brands</h2>
      </div>
      {brands && brands.length > 0 && (
        <div className="my-4  bg-gray-2 rounded-lg">
          {/* Thead */}
          <ul className="flex capitalize  py-4  text-gray-500 bg-white rounded-lg">
            <li className="flex-1 ps-3">name</li>
            <li className=" flex-1 ">description</li>
            <li className=" relative w-1/12 flex px-5 text-center justify-end items-center">
              <div
                onClick={() =>
                  dispatch(dashboardActions.setAction("create-brand"))
                }
                className="createProduct relative text-white hover:text-black cursor-pointer duration-300"
              >
                <FontAwesomeIcon icon={faPlus} className=" relative z-40   " />
                <div className=" absolute w-10 h-10 bg-black  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 rounded-full border border-black"></div>
              </div>
            </li>
          </ul>
          {/* Tbody */}
          <div className="relative top-2  flex flex-col rounded-lg">
            {brands.map((brand, index) => (
              <ul
                key={brand.id}
                className={`flex items-center font-sans roboto-medium py-3 text-gray-700  bg-white px-3 duration-300 hover:bg-gray-200 cursor-pointer`}
              >
                <li className="relative flex items-center gap-2 flex-1 ps-2">
                  <img
                    className="w-10 rounded-full"
                    src={brand.image.url}
                    alt=""
                  />
                  <p>{brand.name}</p>
                  <div className="absolute w-full h-full"></div>
                </li>
                <li className=" flex-1 ">
                  <p>{truncateDescription(brand.description, 45)}</p>
                </li>
                <li className=" relative flex justify-end pr-2 w-1/12 ">
                  <ActionOfBrand brandId={brand._id} />
                </li>
              </ul>
            ))}{" "}
          </div>
        </div>
      )}
      {brands && brands.length === 0 && !loading && !error && (
        <div className="m-4 px-6 bg-gray-2 rounded-lg flex justify-center items-center flex-col flex-1  text-gray-500 superFont">
          <p className=" text-lg">There are no brands available</p>
          <button
            onClick={() => dispatch(dashboardActions.setAction("create-brand"))}
            className=" bg-mainRed text-white p-2 rounded-lg mt-2"
          >
            add brand
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardSize;
