import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
} from "../../redux/apiCalls/productApiCalls";
import { deleteUser, getAllUsers } from "../../redux/apiCalls/profileApiCall";
import {
  deleteCategory,
  fetchCategories,
} from "../../redux/apiCalls/categoryApiCalls";
import { deleteSize, fetchSizes } from "../../redux/apiCalls/sizeApiCalls";
import { deleteBrand, fetchBrands } from "../../redux/apiCalls/brandApiCalls";

function DeleteCard({ type, deleteCard, deleteId, setDeleteCard }) {
  let dispatch = useDispatch();
  const [pageHeight, setPageHeight] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setPageHeight(document.documentElement.scrollHeight);
    };

    setPageHeight(document.documentElement.scrollHeight);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [deleteCard]);

  useEffect(() => {
    if (deleteCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [deleteCard]);

  const handleDelete = async () => {
    if (type === "product") {
      await dispatch(deleteProduct(deleteId));
      dispatch(fetchProducts());
    }
    if (type === "user") {
      await dispatch(deleteUser(deleteId));
      dispatch(getAllUsers());
    }
    if (type === "category") {
      await dispatch(deleteCategory(deleteId));
      dispatch(fetchCategories());
    }
    if (type === "size") {
      await dispatch(deleteSize(deleteId));
      dispatch(fetchSizes());
    }
    if (type === "brand") {
      await dispatch(deleteBrand(deleteId));
      dispatch(fetchBrands());
    }
    setDeleteCard(false);
  };

  return (
    deleteCard && (
      <div className="w-full h-full fixed inset-0 z-50">
        <div
          onClick={() => setDeleteCard(false)}
          className="w-full h-full bg-black opacity-15 absolute "
        ></div>
        <div className="lg:w-1/3 md:w-1/2 w-70% h-1/3 bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg">
          <div className="p-8 h-full flex flex-col justify-between">
            <div>
              <p className="text-xl mb-4">
                Are you sure you want to delete the {type}?
              </p>
              <p className="text-sm text-gray-500">
                Deleting this {type} will also delete all associated data.
              </p>
            </div>

            <div className="flex">
              <button
                onClick={handleDelete}
                className="px-4 py-2 mr-2 bg-red-500 hover:bg-red-600 duration-200 text-white rounded"
              >
                Delete Product
              </button>
              <button
                onClick={() => setDeleteCard(false)}
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

export default DeleteCard;
