// Import necessary modules and controllers for categories
const express = require("express");
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  updateImageCategoryById,
} = require("../controllers/categoryCtrl");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken"); // Modify middleware as needed
const { imageUpload } = require("../middleware/uploadImage");

// Create an Express router
const router = express.Router();

// Route: Get all categories (Public access)
// Route: Create a new category (requires admin access)
router
  .route("/")
  .get(getAllCategories)
  //   .post(verifyTokenAndAdmin, createCategory);
  .post(imageUpload.single("image"), createCategory);

// Route: Get, Update, and Delete a category by ID (Public access)
// Route: Get a category by ID (Public access)
router
  .route("/:id")
  .get(getCategoryById)
  //   .put(verifyTokenAndAdmin, updateCategory)
  .put(updateCategory)
  //   .delete(verifyTokenAndAdmin, deleteCategory);
  .delete(deleteCategory);

router.put(
  "/update-image/:id",
  imageUpload.single("image"),
  updateImageCategoryById
);
// Export the router
module.exports = router;
