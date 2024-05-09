import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uploadImage from "../../images/icons/gallery.png";
import {
  fetchProducts,
  updateProductImage,
} from "../../redux/apiCalls/productApiCalls";
import { useParams } from "react-router-dom";
import { productActions } from "../../redux/slices/productSlice";

function UpdateProductImage() {
  const fileInputRef = useRef(null);
  const { product } = useSelector((state) => state.product);
  const { editProductId } = useSelector((state) => state.dashboard);
  const [selectedFile, setSelectedFile] = useState(null);
  let dispatch = useDispatch();

  const handleImageUploadClick = () => {
    // Trigger click event on file input element
    fileInputRef.current.click();
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file);
    // Create FormData object and append the file to it
    const formData = new FormData();
    formData.append("image", file);

    // Dispatch the action with the FormData
    await dispatch(updateProductImage(editProductId, formData));
    dispatch(fetchProducts());
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-40 h-40 rounded-full  overflow-hidden border-gray-300 border">
        <img
          className="w-40"
          src={
            selectedFile
              ? URL.createObjectURL(selectedFile)
              : product?.image?.url
          }
          alt=""
        />
        {/* Invisible file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
        {/* Overlay div for file upload */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center bg-gray-300 opacity-0 hover:opacity-100 duration-300 cursor-pointer"
          onClick={handleImageUploadClick}
        >
          <img className="w-1/2 opacity-35" src={uploadImage} alt="Upload" />
        </div>
      </div>
    </div>
  );
}

export default UpdateProductImage;
