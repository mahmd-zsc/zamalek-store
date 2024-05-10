import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSize, fetchSizes } from "../../../redux/apiCalls/sizeApiCalls";
import { useNavigate } from "react-router-dom";
import { dashboardActions } from "../../../redux/slices/dashboardSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CreateSize() {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({ name: "", description: "" });
  let { loading, error } = useSelector((state) => state.size);
  let dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (Object.keys(newErrors).length === 0) {
      console.log("Submitted size:", formData);
      dispatch(createSize(formData));
      if (!error) {
        dispatch(dashboardActions.setAction(""));
        dispatch(fetchSizes());
      }
      setFormData({ name: "", description: "" });
      setErrors({ name: "", description: "" });
    }
  };

  return (
    <div className="  roboto-medium capitalize rounded-lg px-2 pb-4 ">
        <div className="flex justify-between items-center  pb-4">
        <h5 className="text-2xl font-bold">create Size</h5>
        <FontAwesomeIcon
          icon={faTimes}
          size="lg"
          className="cursor-pointer text-gray-600 hover:text-gray-900 duration-500 rotate-90 hover:rotate-0"
          onClick={() => dispatch(dashboardActions.setAction(""))}
        />
      </div>
        <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
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
          <div className="flex flex-col gap-2 ">
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
          <div className=" flex gap-1 justify-end mt-4">
            {" "}
            <button
              onClick={() => dispatch(dashboardActions.setAction(""))}
              className=" px-4 py-2 border-2 border-black text-black hover:text-white hover:bg-black rounded-lg duration-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="  text-center py-2 w-16 border-2 border-mainRed text-mainRed hover:text-white hover:bg-mainRed rounded-lg duration-500"
            >
              save
            </button>
          </div>
        </form>
    </div>
  );
}

export default CreateSize;
