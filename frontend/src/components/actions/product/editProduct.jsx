import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/apiCalls/categoryApiCalls";
import { fetchBrands } from "../../../redux/apiCalls/brandApiCalls";
import { fetchSizes } from "../../../redux/apiCalls/sizeApiCalls";


import ColorSelect from "../../colorSelect/colorSelect";

import {
  fetchProducts,
  updateProduct,
} from "../../../redux/apiCalls/productApiCalls";
import UpdateProductImage from "../../updateProductImage/updateProductImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { dashboardActions } from "../../../redux/slices/dashboardSlice";

function EditProduct() {
  const dispatch = useDispatch();

  const { editProductId } = useSelector((state) => state.dashboard);
  const { category } = useSelector((state) => state);
  const { sizes } = useSelector((state) => state.size);
  const { brands } = useSelector((state) => state.brand);

  let { product, error, loading } = useSelector((state) => state.product);
  const [activeColor, setActiveColor] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    color: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    brand: "",
    sizes: [],
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    brand: "",
    color: "",
    sizes: "",
  });
  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      // Clear the error message when user starts typing in the input
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      description,
      price,
      category,
      discount,
      brand,
      color,
      sizes,
    } = formData;

    // Validate form fields
    const errors = {};
    if (!title) errors.title = "Title is required";
    if (!description) errors.description = "Description is required";
    if (!price) errors.price = "Price is required";
    if (!category) errors.category = "Category is required";
    if (!color) errors.color = "Color is required";
    if (sizes.length === 0) errors.sizes = "At least one size is required";
    // Display error messages for each field
    setErrors(errors);

    // If there are errors, prevent form submission
    if (Object.keys(errors).length > 0) return;

    const data = {
      title,
      description,
      price,
      discount: +discount,
      category,
      brand,
      color,
      sizes,
    };
    if (!error) {
      dispatch(updateProduct(editProductId, data));
      console.log(formData);
      setTimeout(() => {
        dispatch(dashboardActions.setAction(""));
        dispatch(fetchProducts());
      }, 2000);
    }
  };

  let sizeHandler = (id) => {
    setFormData((prevState) => ({
      ...prevState,
      sizes: prevState.sizes.includes(id)
        ? prevState.sizes.filter((sizeId) => sizeId !== id)
        : [...prevState.sizes, id],
    }));
    // Clear the error message when user starts selecting sizes
    setErrors({ ...errors, sizes: "" });
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(fetchSizes());
  }, []);
console.log(formData)
  useEffect(() => {
    setFormData({
      title: product?.title,
      color: product?.color._id,
      description: product?.description,
      price: product?.price,
      discount: product?.discount,
      category: product?.category.id,
      brand: product?.brand?._id,
      sizes: product?.sizes,
    });
    setActiveColor(product?.color.name);
  }, [product]);
  return (
    <div className="w-full  roboto-medium capitalize rounded-lg px-2 pb-4">
      <div className="flex justify-between items-center w-full pb-4">
        <h5 className="text-2xl font-bold">edit</h5>
        <FontAwesomeIcon
          icon={faTimes}
          size="lg"
          className="cursor-pointer text-gray-600 hover:text-gray-900 duration-500 rotate-90 hover:rotate-0"
          onClick={() => dispatch(dashboardActions.setAction(""))}
        />
      </div>
      <UpdateProductImage />
      <form
        className="flex flex-col gap-4 text-gray-500"
        onSubmit={handleSubmit}
      >
        {/* title */}
        <div className="flex flex-col gap-2 md:items-start">
          <label className="mb text-gray-400" htmlFor="title">
            Title
          </label>
          <input
            className="outline-none flex-1 w-full p-2 border-2 border-gray-300 rounded-md"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}
        </div>
        {/* Description */}
        <div className="flex flex-col gap-2 ">
          <label className="mb text-gray-400" htmlFor="description">
            Description
          </label>
          <textarea
            className="outline-none flex-1 w-full custom-scrollbar p-2 border-2 border-gray-300 rounded-md"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            cols="30"
            rows="10"
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </div>
        <div className=" flex w-full gap-4 flex-col sm:flex-row">
          {/* price */}
          <div className="flex flex-col gap-2 md:items-start flex-1">
            <label className="mb text-gray-400" htmlFor="price">
              Price
            </label>
            <div className=" flex items-center relative w-full">
              <p className=" absolute left-2 uppercase ">egp</p>
              <input
                className="outline-none flex-1 w-full p-2 ps-10 border-2 border-gray-300 rounded-md"
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            {errors.price && (
              <span className="text-red-500 text-sm">{errors.price}</span>
            )}
          </div>
          {/* discount */}
          <div className="flex flex-col gap-2 md:items-start flex-1">
            <label className="mb text-gray-400" htmlFor="discount">
              discount
            </label>
            <div className=" flex items-center relative w-full">
              <p className=" absolute left-2 uppercase ">egp</p>
              <input
                className="outline-none flex-1 w-full p-2 ps-10 border-2 border-gray-300 rounded-md"
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {/* Category */}
        <div className="flex flex-col gap-2 md:items-start">
          <label className="mb text-gray-400" htmlFor="category">
            Category
          </label>
          <select
            value={formData.category}
            onChange={handleChange}
            className="outline-none flex-1 w-full p-2 border-2 border-gray-300 rounded-md"
            name="category"
            id="category"
          >
            <option value="">Select a category</option>
            {category.categories.map((c) => (
              <option
                key={c.id}
                value={c.id}
                selected={c._id === formData.category}
                className="py-1"
              >
                {c.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">{errors.category}</span>
          )}
        </div>
        {/* Brand */}
        <div className="flex flex-col gap-2 md:items-start">
          <label className="mb text-gray-400" htmlFor="brand">
            Brand
          </label>
          <select
            value={formData.brand}
            onChange={handleChange}
            className="outline-none flex-1 w-full p-2 border-2 border-gray-300 rounded-md"
            name="brand"
            id="brand"
          >
            <option value="">Select a brand</option>
            {brands.map((b) => (
              <option
                key={b.id}
                value={b._id}
                selected={b.id === formData?.brand}
                className="py-1"
              >
                {b.name}
              </option>
            ))}
          </select>
          {errors.brand && (
            <span className="text-red-500 text-sm">{errors.brand}</span>
          )}
        </div>
        {errors.color && (
          <span className="text-red-500 text-sm">{errors.color}</span>
        )}
        {/* Sizes select */}
        <div className="flex flex-col gap-2 items-start">
          <label className="mb text-gray-400" htmlFor="sizes">
            Sizes
          </label>
          <div className="sizes flex w-full flex-wrap gap-4">
            {sizes.map((size) => (
              <div
                onClick={() => sizeHandler(size._id)}
                className={`px-2 py-1 text-black  border border-black cursor-pointer duration-200 opacity-50 hover:opacity-100  ${
                  formData.sizes?.includes(size._id) ? "active" : ""
                }`}
                key={size.id}
              >
                {size.name}
              </div>
            ))}
          </div>
          {errors.sizes && (
            <span className="text-red-500 text-sm">{errors.sizes}</span>
          )}
        </div>
        {/* Color */}
        <ColorSelect
          activeColor={activeColor}
          setActiveColor={setActiveColor}
          handleChange={handleChange}
        />{" "}
        {/* Image file */}
        {error && (
          <div className="bg-red-300 w-full text-center py-1 mb-2 rounded-md text-red-500 font-sans border-2 border-red-400 opacity-80 hover: duration-200">
            {error.message}
          </div>
        )}
        <div className=" flex gap-1 justify-center md:justify-end mt-4">
          {" "}
          <button
            onClick={() => dispatch(dashboardActions.setAction(""))}
            className=" px-4 py-2 border-2 border-black text-black hover:text-white hover:bg-black rounded-lg duration-500"
          >
            Cancel
          </button>
          {!loading ? (
            <button
              type="submit"
              className="  text-center py-2 w-16 border-2 border-mainRed text-mainRed hover:text-white hover:bg-mainRed rounded-lg duration-500"
            >
              save
            </button>
          ) : (
            <button
              type="submit"
              className="  text-center py-2 w-16 border-2 border-mainRed text-mainRed hover:text-white  rounded-lg duration-500"
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  border: "5px solid rgb(255, 0, 0);",
                  borderTopColor: "white",
                  animation: "loader 0.60s linear infinite",
                  borderRadius: "50%",
                }}
                className="circle-loading m-auto"
              ></div>
            </button>
          )}
        </div>{" "}
      </form>
    </div>
  );
}

export default EditProduct;
