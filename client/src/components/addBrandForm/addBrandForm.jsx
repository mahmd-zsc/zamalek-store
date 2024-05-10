import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrand, fetchBrands } from "../../redux/apiCalls/brandApiCalls";
import uploadImage from "../../images/icons/upload.png";

function AddBrandForm({ setAddBrand, addBrand }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [errors, setErrors] = useState({ name: "", description: "" });
  const { loading, error } = useSelector((state) => state.brand);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

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
      const formDataWithImage = new FormData();
      formDataWithImage.append("name", formData.name);
      formDataWithImage.append("description", formData.description);
      formDataWithImage.append("image", formData.image);

      await dispatch(createBrand(formDataWithImage));
      dispatch(fetchBrands());
      if (!error) {
        setAddBrand(false);
      }
      setFormData({ name: "", description: "", image: null });
      setErrors({ name: "", description: "" });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full h-full top-0 left-0 fixed  flex justify-center items-center z-50">
      <div
        onClick={() => setAddBrand(false)}
        className="absolute left-0 top-0 w-full h-full bg-black z-30 opacity-20"
      ></div>

      <div className="w-1/2 bg-white p-8 rounded-lg z-40">
        <h2 className="text-2xl mb-4 text-gray-500">Add Brand</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-col gap-2 md:items-start">
            <label className="mb text-gray-400" htmlFor="brandName">
              Name
            </label>
            <input
              className="outline-none flex-1 w-full p-2 border-2 border-gray-300 rounded-md roboto-medium"
              type="text"
              id="brandName"
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
            <label className="mb text-gray-400" htmlFor="brandDescription">
              Description
            </label>
            <textarea
              className="outline-none flex-1 roboto-medium w-full custom-scrollbar p-2 border-2 border-gray-300 rounded-md"
              id="brandDescription"
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
          {/* Image file */}
          <div className="p-5  border-2 border-gray-300 flex flex-col justify-center items-center gap-2 border-dashed rounded-md">
            {formData.image ? (
              <div className=" w-20 h-20 rounded-full overflow-hidden">
                <img
                  className=""
                  src={URL.createObjectURL(formData.image)}
                  alt="Uploaded File"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <img className="w-10 opacity-30" src={uploadImage} alt="" />
                <p className="text-gray-400 text-sm">
                  Drag & Drop to Upload File
                  <span className="block text-center">or</span>
                </p>
              </div>
            )}
            <label
              htmlFor="file-upload"
              className="inline-block px-2 py-1 text-sm text-gray-400 font-semibold cursor-pointer border-2 border-gray-300 rounded-md"
            >
              Browse File
            </label>
            <input
              id="file-upload"
              type="file"
              name="file"
              className="hidden"
              onChange={handleImageChange}
            />
            {errors.image && (
              <span className="text-red-500 text-sm">{errors.image}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setAddBrand(false)}
              className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
                  className="w-full h-full text-white font-bold focus:outline-none focus:shadow-outline"
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

export default AddBrandForm;
