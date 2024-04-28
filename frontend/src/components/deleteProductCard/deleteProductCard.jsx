import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
} from "../../redux/apiCalls/productApiCalls";

function DeleteProductCard({
  deleteProductCard,
  deleteProductId,
  setDeleteProductCard,
}) {
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
  }, [deleteProductCard]);

  useEffect(() => {
    if (deleteProductCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [deleteProductCard]);

  const handleDelete = async () => {
    await dispatch(deleteProduct(deleteProductId));
    dispatch(fetchProducts());
    setDeleteProductCard(false);
  };

  return (
    deleteProductCard && (
      <div className="w-full h-full fixed inset-0 z-50">
        <div
          onClick={() => setDeleteProductCard(false)}
          className="w-full h-full bg-black opacity-15 absolute "
        ></div>
        <div className="lg:w-1/3 md:w-1/2 w-70% h-1/3 bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg">
          <div className="p-8 h-full flex flex-col justify-between">
            <div>
              <p className="text-xl mb-4">
                Are you sure you want to delete the product?
              </p>
              <p className="text-sm text-gray-500">
                Deleting this product will also delete all associated data,
                including product images, descriptions, and related orders. This
                action is irreversible.
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
                onClick={() => setDeleteProductCard(false)}
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

export default DeleteProductCard;
