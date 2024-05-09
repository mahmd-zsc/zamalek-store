import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "../../../redux/slices/dashboardSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  createCategory,
  fetchCategories,
} from "../../../redux/apiCalls/categoryApiCalls";
import uploadImage from "../../../images/icons/upload.png";

function CreateCategory() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
  });
  const { error, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.image) {
      newErrors.image = "Image is required";
    }

    if (Object.keys(newErrors).length === 0) {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("image", formData.image);
      await dispatch(createCategory(data));
      dispatch(fetchCategories());
      if (!loading) {
        dispatch(dashboardActions.setAction(""));
      }

      setFormData({ name: "", description: "", image: null });
      setErrors({ name: "", description: "", image: "" });
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setFormData({ ...formData, image });
    setErrors({ ...errors, image: "" });
  };
  return (
    <div className="roboto-medium capitalize rounded-lg px-2 pb-4">
      <div className="flex justify-between items-center pb-4">
        <h5 className="text-2xl font-bold">create category</h5>
        <FontAwesomeIcon
          icon={faTimes}
          size="lg"
          className="cursor-pointer text-gray-600 hover:text-gray-900 duration-500 rotate-90 hover:rotate-0"
          onClick={() => dispatch(dashboardActions.setAction(""))}
        />
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Image file */}
        <div className="flex justify-center items-center">
          <div className="relative w-40 h-40 rounded-full  overflow-hidden border-gray-300 border">
            {formData.image ? (
              <img
                className="w-40"
                src={URL.createObjectURL(formData.image)}
                alt=""
              />
            ) : (
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center bg-gray-300   cursor-pointer"
                onClick={handleImageUploadClick}
              >
                <img
                  className="w-1/2 opacity-35"
                  src={uploadImage}
                  alt="Upload"
                />
              </div>
            )}
            {/* Invisible file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>
        {errors.image && (
          <div className="text-red-500 text-sm text-center">{errors.image}</div>
        )}
        {/* name */}
        <div className="flex flex-col gap-2 md:items-start">
          <label className="mb text-gray-400" htmlFor="title">
            Name
          </label>
          <input
            className="outline-none flex-1 w-full p-2 border-2 border-gray-300 rounded-md roboto-medium"
            type="text"
            id="title"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>
        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="mb text-gray-400" htmlFor="description">
            Description
          </label>
          <textarea
            className="outline-none flex-1 roboto-medium w-full custom-scrollbar p-2 border-2 border-gray-300 rounded-md"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            cols="10"
            rows="10"
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </div>

        <div className="flex gap-1 justify-end mt-4">
          <button
            type="button"
            onClick={() => dispatch(dashboardActions.setAction(""))}
            className="px-4 py-2 border-2 border-black text-black hover:text-white hover:bg-black rounded-lg duration-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-center py-2 w-16 border-2 border-mainRed text-mainRed hover:text-white hover:bg-mainRed rounded-lg duration-500"
          >
            Save
          </button>
        </div>
      </form>

      {/* {error  && (
        <div className="text-red-500 text-sm">{error.}</div>
      )} */}
    </div>
  );
}

export default CreateCategory;
