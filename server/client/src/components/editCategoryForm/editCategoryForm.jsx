import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  updateCategory,
} from "../../redux/apiCalls/categoryApiCalls";

function EditCategoryForm({ category, editCategory, setEditCategory }) {
  const { loading, error } = useSelector((state) => state.category);
  const [formData, setFormData] = useState({
    name: category?.name,
    description: category?.description,
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (editCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [editCategory]);

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
      dispatch(updateCategory(category.id, formData));

      setTimeout(() => {
        setEditCategory(false);
        dispatch(fetchCategories());
      }, 500);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    editCategory && (
      <div className="w-full fixed inset-0 z-50">
        <div
          onClick={() => setEditCategory(false)}
          className="w-full h-full bg-black opacity-15 absolute inset-0"
        ></div>
        <div className="bg-white w-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl mb-4 text-gray-500">Edit Category</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="flex flex-col gap-2 md:items-start">
              <label className="mb text-gray-400" htmlFor="categoryName">
                Name
              </label>
              <input
                className="outline-none flex-1 w-full p-2 border-2 border-gray-300 rounded-md roboto-medium"
                type="text"
                id="categoryName"
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
              <label className="mb text-gray-400" htmlFor="categoryDescription">
                Description
              </label>
              <textarea
                className="outline-none flex-1 roboto-medium w-full custom-scrollbar p-2 border-2 border-gray-300 rounded-md"
                id="categoryDescription"
                name="description"
                value={formData.description}
                onChange={handleChange}
                cols="10"
                rows="5"
              ></textarea>
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description}
                </span>
              )}
            </div>
            {/* Submit Button */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditCategory(false)}
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
      </div>
    )
  );
}

export default EditCategoryForm;
