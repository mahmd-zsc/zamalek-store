import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllSizes } from "../../redux/apiCalls/sizeApiCall";
import deleteImage from "../../images/icons/trash.png";
// import DeleteSizeCard from "../../components/DeleteSizeCard/DeleteSizeCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchSizes } from "../../redux/apiCalls/sizeApiCalls";
import AddSizeForm from "../../components/addSizeForm/addSizeForm";

function DashboardSize() {
  const { sizes, loading, error } = useSelector((state) => state.size);
  const dispatch = useDispatch();
  const [addSize, setAddSize] = useState(false);

  useEffect(() => {
    dispatch(fetchSizes());
  }, [dispatch]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="h-full">
      {loading && (
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "10px solid rgb(255, 0, 0);",
            borderTopColor: "white",
            animation: "loader 0.60s linear infinite",
            borderRadius: "50%",
          }}
          className="circle-loading absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 m-auto"
        ></div>
      )}
      {error && <div>{error}</div>}
      {sizes && sizes.length > 0 && (
        <div className="m-4 px-6 bg-gray-2 rounded-lg" data-aos="fade-up">
          {/* Thead */}
          <ul className="flex capitalize py-4 text-white bg-mainRed">
            <li className="flex-1 ps-3">Size</li>
            <li className=" flex-1 ">description</li>
            <li className=" w-1/6 text-center ">actions</li>
          </ul>
          {/* Tbody */}
          {sizes.map((size, index) => (
            <ul
              key={size.id}
              className={`flex items-center font-sans roboto-medium py-2 text-gray-700 border ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <li className="relative flex items-center gap-2 flex-1 ps-2">
                <p>{size.name}</p>
                <div className="absolute w-full h-full"></div>
              </li>
              <li className=" flex-1 ">
                <p>{size.description}</p>
              </li>
              <li className=" w-1/6 ">
                {/* <p>{size.description}</p> */}
              </li>
            </ul>
          ))}
        </div>
      )}
      {sizes && sizes.length === 0 && !loading && !error && (
        <div className="m-4 px-6 bg-gray-2 rounded-lg">
          <p className=" text-2xl">There are no sizes available</p>
        </div>
      )}
      {!loading && (
        <button
          data-aos="fade-up"
          onClick={() => setAddSize(true)}
          className=" mx-10 my-5  bg-mainRed opacity-90 hover:opacity-100 duration-200 px-4 py-2 rounded-md mt-2 text-white "
        >
          <span className="button-text">add size</span>
        </button>
      )}

      {addSize && <AddSizeForm addSize={addSize} setAddSize={setAddSize} />}
    </div>
  );
}

export default DashboardSize;
