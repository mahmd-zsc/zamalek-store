// Import necessary modules and controllers for sizes
const express = require("express");
const {
  getAllSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize,
} = require("../controllers/sizeCtrl"); // Adjust the path based on your file structure
const { verifyTokenAndAdmin } = require("../middleware/verifyToken"); // Modify middleware as needed

// Create an Express router
const router = express.Router();

// Route: Get all sizes (Public access)
// Route: Create a new size (requires admin access)
router
  .route("/")
  .get(getAllSizes)
  // .post(verifyTokenAndAdmin, createSize);
  .post(createSize);

// Route: Get, Update, and Delete a size by ID (Public access)
// Route: Get a size by ID (Public access)
router
  .route("/:id")
  .get(getSizeById)
  // .put(verifyTokenAndAdmin, updateSize)
  .put(updateSize)
  // .delete(verifyTokenAndAdmin, deleteSize);
  .delete(deleteSize);

// Export the router
module.exports = router;
