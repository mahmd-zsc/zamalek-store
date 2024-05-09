import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { dashboardActions } from "../../../redux/slices/dashboardSlice";
import uploadImage from "../../../images/icons/upload.png";
import { fetchBrands, updateBrand, updateBrandImage } from "../../../redux/apiCalls/brandApiCalls";
import { fetchCategories } from "../../../redux/apiCalls/categoryApiCalls";


function EditBrand() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // State for form data and errors
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  // Fetching brand and handling loading/error states
  const { brand, loading, error } = useSelector((state) => state.brand);

  // Handle file input change
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const formData = new FormData();
    formData.append("image", file);
    await dispatch(updateBrandImage(brand._id, formData));

    dispatch(fetchBrands());
  };

  // Handle image upload click
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Populate form data on brand change
  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name,
        description: brand.description,
      });
    }
  }, [brand]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (Object.keys(newErrors).length === 0) {
      dispatch(updateBrand(brand._id, formData));
      if (!loading) {
        await dispatch(fetchBrands());
        if (!loading && !error) {
          dispatch(dashboardActions.setAction(""));
        }
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="roboto-medium capitalize rounded-lg px-2 pb-4">
      <div className="flex justify-between items-center pb-4">
        <h5 className="text-2xl font-bold">edit brand</h5>
        <FontAwesomeIcon
          icon={faTimes}
          size="lg"
          className="cursor-pointer text-gray-600 hover:text-gray-900 duration-500 rotate-90 hover:rotate-0"
          onClick={() => dispatch(dashboardActions.setAction(""))}
        />
      </div>{" "}
      {/* image */}
      <div className="flex justify-center items-center">
        <div className="relative w-40 h-40 rounded-full  overflow-hidden border-gray-300 border">
          <img
            className="w-40"
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : brand?.image?.url
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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* name */}
        <div className="flex flex-col gap-2 md:items-start">
          <label className="mb text-gray-400" htmlFor="sizeName">
            Name
          </label>
          <input
            className="outline-none flex-1 w-full p-2 border-2 border-gray-300 rounded-md roboto-medium"
            type="text"
            id="sizeName"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>
        {/* description */}
        <div className="flex flex-col gap-2">
          <label className="mb text-gray-400" htmlFor="sizeDescription">
            Description
          </label>
          <textarea
            className="outline-none flex-1 roboto-medium w-full custom-scrollbar p-2 border-2 border-gray-300 rounded-md"
            id="sizeDescription"
            name="description"
            value={formData.description}
            onChange={handleChange}
            cols="10"
            rows="5"
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => dispatch(dashboardActions.setAction(""))}
            type="button"
            className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <div className="relative w-20 h-10 bg-mainRed rounded flex justify-center items-center">
            {loading ? (
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  border: "2px solid #DB1F24",
                  borderTopColor: "white",
                  animation: "loader 0.60s linear infinite",
                  borderRadius: "50%",
                }}
                className="circle-loading"
              ></div>
            ) : (
              <button
                type="submit"
                className="bg-mainRed text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditBrand;
