const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const {
  Category,
  createCategoryValidation,
  updateCategoryValidation,
} = require("../models/Category");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");
/**
 * @desc  Create a new category
 * @route /api/categories/
 * @method POST
 * @access Public
 */
const createCategory = asyncHandler(async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No image provided" });
  }
  const { error } = createCategoryValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  const savedCategory = await category.save();
  res.status(201).json(savedCategory);
  fs.unlinkSync(imagePath);
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
  if (category.image.publicId !== null) {
    await cloudinaryRemoveImage(category.image.publicId);
  }

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
  const category = await Category.findById(req.params.id).populate("products");
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
/**
 * @desc Update the image category By Id
 * @router /api/categories/update-image/:id
 * @method Put
 * @access private (admin)
 */
const updateImageCategoryById = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ message: "Image file not found" });
  }

  let category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  if (category.image.publicId !== null) {
    await cloudinaryRemoveImage(category.image.publicId);
  }

  let imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  let result = await cloudinaryUploadImage(imagePath);

  category.image = {
    url: result.secure_url,
    publicId: result.public_id,
  };

  await category.save(); // Ensure category is saved before sending response
  fs.unlinkSync(imagePath); // Remove temporary image file

  return res.status(200).json(category);
});
module.exports = {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
  updateImageCategoryById,
};
