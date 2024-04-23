import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSize, fetchSizes } from "../../redux/apiCalls/sizeApiCalls";
import { useNavigate } from "react-router-dom";

function AddSizeForm({ setAddSize, addSize }) {
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

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

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
        dispatch(fetchSizes());
        setTimeout(() => setAddSize(false), 500);
      }
      setFormData({ name: "", description: "" });
      setErrors({ name: "", description: "" });
    }
  };

  return (
    <div className="w-full h-full top-0 left-0 fixed  flex justify-center items-center z-50">
      <div
        onClick={() => setAddSize(false)}
        className=" absolute left-0 top-0 w-full h-full bg-black z-30 opacity-20"
      ></div>

      <div className="w-1/2 bg-white p-8 rounded-lg z-40">
        <h2 className="text-2xl mb-4 text-gray-500">Add Size</h2>
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
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setAddSize(false)}
              className="bg-black  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <div className=" relative w-20 h-10 bg-mainRed rounded flex justify-center items-center">
              {loading ? (
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid #DB1F24",
                    borderTopColor: " white",
                    animation: "loader 0.60s linear infinite",
                    borderRadius: "50%",
                  }}
                  className="circle-loading  "
                ></div>
              ) : (
                <button
                  type="submit"
                  className=" w-full h-full  text-white font-bold   focus:outline-none focus:shadow-outline"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSizeForm;
