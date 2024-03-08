const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const {
  Category,
  createCategoryValidation,
  updateCategoryValidation,
} = require("../models/Category");

/**
 * @desc  Create a new category
 * @route /api/categories/
 * @method POST
 * @access Public
 */
const createCategory = asyncHandler(async (req, res) => {
  const { error } = createCategoryValidation(req.body);
  if (error) {
    return res.status(400).json({ massage: error.details[0].massage });
  }
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
  });

  const savedCategory = await category.save();
  res.status(201).json(savedCategory);
});

/**
 * @desc  Delete a category by ID
 * @route /api/categories/:id
 * @method DELETE
 * @access Public
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(400).json({ massage: "category not found" });

  res.status(200).send("Category deleted successfully");
});

/**
 * @desc  Update a category by ID
 * @route /api/categories/:id
 * @method PUT
 * @access Public
 */
const updateCategory = asyncHandler(async (req, res) => {
  const { error } = updateCategoryValidation(req.body);
  if (error) return res.status(400).json({ massage: error.details[0].massage });

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedCategory)
    return res.status(400).json({ massage: "Category not found" });

  res.status(200).json(updatedCategory);
});

/**
 * @desc  Get a category by ID
 * @route /api/categories/:id
 * @method GET
 * @access Public
 */
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(400).json({ massage: "category not found" });
  }

  res.status(200).json(category);
});

/**
 * @desc  Get all categories
 * @route /api/categories/
 * @method GET
 * @access Public
 */
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

module.exports = {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
};
