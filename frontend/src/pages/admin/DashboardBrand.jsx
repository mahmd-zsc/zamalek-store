import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import deleteImage from "../../images/icons/trash.png";
import editImage from "../../images/icons/pen.png";
import AOS from "aos";
import "aos/dist/aos.css";
// import AddBrandForm from "../../components/addBrandForm/addBrandForm";
// import EditBrandForm from "../../components/editBrandForm/editBrandForm";
import { fetchBrands } from "../../redux/apiCalls/brandApiCalls";
import AddBrandForm from "../../components/addBrandForm/addBrandForm";
import DeleteBrandCard from "../../components/deleteBrandCard/deleteBrandCard";
import EditBrandForm from "../../components/editBrandForm/editBrandForm";

function DashboardBrand() {
  const { brands, loading, error } = useSelector((state) => state.brand);
  const dispatch = useDispatch();
  const [brand, setBrand] = useState(null);
  const [addBrand, setAddBrand] = useState(false);
  const [editBrand, setEditBrand] = useState(false);
  const [deleteBrand, setDeleteBrand] = useState(false);
  const [brandIdToDelete, setBrandIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    AOS.init();
  }, []);

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "...";
  };

  return (
    <div className="dashboard-brand">
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
      {error && <div className="error-message">{error}</div>}
      {brands && brands.length > 0 && (
        <div className="m-4 px-6 bg-gray-2 rounded-lg" data-aos="fade-up">
          <ul className="flex capitalize py-4 text-white bg-mainRed">
            <li className=" w-1/3 ps-3">brand</li>
            <li className="flex-1">Description</li>
            <li className=" w-1/6 text-center">action</li>
          </ul>
          {brands.map((brand, index) => (
            <ul
              key={brand.id}
              className={`flex items-center font-sans roboto-medium py-2 text-gray-700 border ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <li className="relative  w-1/3 flex items-center gap-2  ps-2">
                <div className=" w-10 h-10 rounded-full overflow-hidden">
                  <img src={brand.image.url} alt="" />
                </div>
                <p>{brand.name}</p>
                <div className="absolute w-full h-full"></div>
              </li>
              <li className="flex-1">
                <p>{truncateDescription(brand.description, 45)}</p>
              </li>
              <li className=" w-1/6 text-center flex items-center justify-evenly">
                <img
                  className="  w-8 hover:scale-105 duration-300 cursor-pointer"
                  src={editImage}
                  alt=""
                  onClick={() => {
                    setBrand(brand);
                    setEditBrand(true);
                  }}
                />
                <img
                  className="  w-8 hover:scale-105 duration-300 cursor-pointer"
                  src={deleteImage}
                  alt=""
                  onClick={() => {
                    setDeleteBrand(true);
                    setBrandIdToDelete(brand._id);

                  }}
                />
              </li>
            </ul>
          ))}
        </div>
      )}
      {brands && brands.length === 0 && !loading && !error && (
        <div className="no-brands-message">
          <p>There are no brands available</p>
        </div>
      )}
      {!loading && (
        <button
          // data-aos="fade-up"
          onClick={() => setAddBrand(true)}
          className="mx-10 my-5 bg-mainRed opacity-90 hover:opacity-100 duration-200 px-4 py-2 rounded-md mt-2 text-white"
        >
          Add brand
        </button>
      )}
      {deleteBrand && (
        <DeleteBrandCard
          deleteBrandCard={deleteBrand}
          brandId={brandIdToDelete}
          setDeleteBrandCard={setDeleteBrand}
        />
      )}

      {addBrand && (
        <AddBrandForm addBrand={addBrand} setAddBrand={setAddBrand} />
      )}
      {editBrand && (
        <EditBrandForm
          brand={brand}
          editBrand={editBrand}
          setEditBrand={setEditBrand}
        />
      )}
    </div>
  );
}

export default DashboardBrand;
