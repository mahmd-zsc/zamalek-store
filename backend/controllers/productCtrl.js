const asyncHandler = require("express-async-handler");
const {
  Product,
  createProductValidation,
  updateProductValidation,
} = require("../models/productModel");

/**
 * @desc Create a new product
 * @route POST /api/products
 * @access Public
 */
const createProduct = asyncHandler(async (req, res) => {
  const { error } = createProductValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    sizes: req.body.sizes,
    category: req.body.category,
    images: req.body.images,
    brand: req.body.brand,
    stockQuantity: req.body.stockQuantity,
    ratings: req.body.ratings,
    reviews: req.body.reviews,
    tags: req.body.tags,
  });

  const savedProduct = await product.save();
  res.status(201).json(savedProduct);
});

/**
 * @desc Delete a product by ID
 * @route DELETE /api/products/:id
 * @access Public
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(400).json({ message: "Product not found" });

  res.status(200).send("Product deleted successfully");
});

/**
 * @desc Update a product by ID
 * @route PUT /api/products/:id
 * @access Public
 */
const updateProduct = asyncHandler(async (req, res) => {
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
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

/**
 * @desc Get all products
 * @route GET /api/products
 * @access Public
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
};
