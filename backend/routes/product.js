const express = require("express");
const router = express.Router();
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
} = require("../controllers/productCtrl");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken"); // Modify middleware as needed

// Route: Get all products (Public access)
// Route: Create a new product (Public access)
router.route("/").get(getAllProducts).post(createProduct);

// Route: Get, Update, and Delete a product by ID (Public access)
// Route: Get a product by ID (Public access)
router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

// Export the router
module.exports = router;
