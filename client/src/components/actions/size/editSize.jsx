import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchSizes,
  updateSize,
  updatesize,
} from "../../../redux/apiCalls/sizeApiCalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { dashboardActions } from "../../../redux/slices/dashboardSlice";

function EditSize() {
  let { size } = useSelector((state) => state.size);
  const { loading, error } = useSelector((state) => state.size);
  const [formData, setFormData] = useState({
    name: size?.name,
    description: size?.description,
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    setFormData({
      name: size?.name,
      description: size?.description,
    });
  }, [size]);

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
      dispatch(updateSize(size._id, formData));
      if (!loading) {
        await dispatch(fetchSizes());
        dispatch(dashboardActions.setAction(""));
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="roboto-medium capitalize rounded-lg px-2 pb-4">
      <div className="flex justify-between items-center  pb-4">
        <h5 className="text-2xl font-bold">edit Size</h5>
        <FontAwesomeIcon
          icon={faTimes}
          size="lg"
          className="cursor-pointer text-gray-600 hover:text-gray-900 duration-500 rotate-90 hover:rotate-0"
          onClick={() => dispatch(dashboardActions.setAction(""))}
        />
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Name */}
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
        {/* Description */}
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
        {/* Submit Button */}
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

export default EditSize;
