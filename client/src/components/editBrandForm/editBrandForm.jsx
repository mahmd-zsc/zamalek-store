import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrands,
  updateBrand,
  updateBrandImage,
} from "../../redux/apiCalls/brandApiCalls";
import { brandActions } from "../../redux/slices/brandSlice";
import uploadImage from "../../images/icons/gallery.png";

function EditBrandForm({ brand, editBrand, setEditBrand }) {
  const fileInputRef = useRef(null);
  const { loading, error } = useSelector((state) => state.brand);
  const [formData, setFormData] = useState({
    name: brand?.name,
    description: brand?.description,
  });
  let [image, setImage] = useState(brand?.image);
  const [selectedFile, setSelectedFile] = useState(null);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("image", file);
    console.log(file);
     dispatch(updateBrandImage(brand._id, formData));
    // dispatch(brandActions.setBrands([]));
  };

  useEffect(() => {
    if (editBrand) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [editBrand]);

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
      dispatch(updateBrand(brand._id, formData));
      setTimeout(() => {
        setEditBrand(false);
        dispatch(fetchBrands());
      }, 500);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    editBrand && (
      <div className="w-full fixed inset-0 z-50">
        <div
          onClick={() => setEditBrand(false)}
          className="w-full h-full bg-black opacity-15 absolute inset-0"
        ></div>
        <div className="bg-white w-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl mb-4 text-gray-500">Edit Brand</h2>
          <div className="relative w-40 h-40 rounded-full m-auto  overflow-hidden border-gray-300 border">
            <img
              className="w-40"
              src={
                selectedFile ? URL.createObjectURL(selectedFile) : image?.url
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
              onClick={() => fileInputRef.current.click()}
            >
              <img
                className="w-1/2 opacity-35"
                src={uploadImage}
                alt="Upload"
              />
            </div>
          </div>
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
                <span className="text-red-500 text-sm">
                  {errors.description}
                </span>
              )}
            </div>
            {/* Submit Button */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditBrand(false)}
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
        {error && <span className="text-red-500 text-sm">{error.message}</span>}
      </div>
    )
  );
}

export default EditBrandForm;
