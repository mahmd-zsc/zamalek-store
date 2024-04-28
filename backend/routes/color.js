// Import necessary modules and controllers for colors
const express = require("express");
const {
  getAllColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
} = require("../controllers/colorCtrl");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken"); // Modify middleware as needed

// Create an Express router
const router = express.Router();

// Route: Get all colors (Public access)
// Route: Create a new color (requires admin access)
router
  .route("/")
  .get(getAllColors)
  //   .post(verifyTokenAndAdmin, createColor);
  .post(createColor);

// Route: Get, Update, and Delete a color by ID (Public access)
// Route: Get a color by ID (Public access)
router
  .route("/:id")
  .get(getColorById)
  //   .put(verifyTokenAndAdmin, updateColor)
  .put(updateColor)
  //   .delete(verifyTokenAndAdmin, deleteColor);
  .delete(deleteColor);

// Export the router
module.exports = router;
