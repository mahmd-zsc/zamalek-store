const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const {
  Product,
  createProductValidation,
  updateProductValidation,
} = require("../models/Product");
const { Category } = require("../models/Category");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

/**
 * @desc Create a new product
 * @route POST /api/products
 * @access Public
 */
const createProduct = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image provided" });
  }

  const { error } = createProductValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let isCategory = await Category.findById(req.body.category);
  if (!isCategory)
    return res.status(400).json({ massage: "category is no found" });

  // Handle image upload
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // Create a new product instance with the required fields, including color
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    sizes: req.body.sizes,
    category: req.body.category,
    brand: req.body.brand,
    color: req.body.color,
    discount: req.body.discount,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  // Save the product to the database
  const savedProduct = await product.save();

  // Remove image file from the image folder in the app
  fs.unlinkSync(imagePath);
  res.status(201).json({ message: " the product has been created! " });
});

/**
 * @desc Delete a product by ID
 * @route DELETE /api/products/:id
 * @access Public
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(400).json({ message: "Product not found" });

  res.status(200).json({ message: "Product deleted successfully" });
});

/**
 * @desc Update a product by ID
 * @route PUT /api/products/:id
 * @access Public
 */
const updateProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { error } = updateProductValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedProduct)
    return res.status(400).json({ message: "Product not found" });

  res.status(200).json(updatedProduct);
});

/**
 * @desc Get a product by ID
 * @route GET /api/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category")
    .populate("brand");

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

/**
 * @desc Get all products with pagination
 * @route GET /api/products
 * @access Public
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1 } = req.query;

  // Calculate skip value for pagination
  const limit = 20; // Number of products per page
  const skip = (page - 1) * limit;

  // Query products for the current page
  const data = await Product.find()
    .populate("category")
    .limit(limit)
    .skip(skip);

  // Find total count of products
  const totalCount = await Product.countDocuments();

  // Calculate total number of pages
  const totalPages = Math.ceil(totalCount / limit);

  // Return products, total pages, and total count in the response
  res.status(200).json({
    data,
    totalPages,
    totalCount,
  });
});

/**
 * @desc Update the image Product By Id
 * @router /api/Products/update-image/:id
 * @method Put
 * @access private (admin)
 */
const updateImageProductById = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ massage: "image file not found" });
  }
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ massage: "product not found" });
  }

  if (product.image.publicId !== null) {
    await cloudinaryRemoveImage(product.image.publicId);
  }
  let imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  let result = await cloudinaryUploadImage(imagePath);

  product.image = {
    url: result.secure_url,
    publicId: result.public_id,
  };

  // Add color update
  if (req.body.color) {
    product.color = req.body.color;
  }

  product.save();
  fs.unlinkSync(imagePath);
  return res.status(200).json(product);
});

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  updateImageProductById,
};
