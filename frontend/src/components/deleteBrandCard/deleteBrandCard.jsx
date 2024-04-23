import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteBrand, fetchBrands } from "../../redux/apiCalls/brandApiCalls";

function DeleteBrandCard({ deleteBrandCard, brandId, setDeleteBrandCard }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteBrandCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [deleteBrandCard]);
console.log(brandId)
  const handleDelete = async () => {
    await dispatch(deleteBrand(brandId));
    dispatch(fetchBrands());
    setDeleteBrandCard(false);
  };

  return (
    deleteBrandCard && (
      <div className="w-full fixed inset-0 z-50">
        <div
          onClick={() => setDeleteBrandCard(false)}
          className="w-full h-full bg-black opacity-15 absolute inset-0"
        ></div>
        <div className="lg:w-1/3 md:w-1/2 w-70% h-1/3 bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg">
          <div className="p-8 h-full flex flex-col justify-between">
            <div>
              <p className="text-xl mb-4">
                Are you sure you want to delete the brand?
              </p>
              <p className="text-sm text-gray-500">
                Deleting this brand will also delete all associated data,
                including products, orders, and other related data. This action
                is irreversible.
              </p>
            </div>

            <div className="flex">
              <button
                onClick={handleDelete}
                className="px-4 py-2 mr-2 bg-red-500 hover:bg-red-600 duration-200 text-white rounded"
              >
                Delete Brand
              </button>
              <button
                onClick={() => setDeleteBrandCard(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 duration-200 text-gray-800 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default DeleteBrandCard;
