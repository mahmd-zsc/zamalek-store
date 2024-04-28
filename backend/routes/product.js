const express = require("express");
const router = express.Router();
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  updateImageProductById,
  getProductById,
  getProductsOnSale,
} = require("../controllers/productCtrl");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken"); // Modify middleware as needed
const { imageUpload } = require("../middleware/uploadImage");

// Route: Get all products (Public access)
// Route: Create a new product (Public access)
router
  .route("/")
  .get(getAllProducts)
  .post(imageUpload.single("image"), createProduct);

// Route: Get products on sale (Public access)
router.route("/sale").get(getProductsOnSale);

// Route: Get, Update, and Delete a product by ID (Public access)
// Route: Get a product by ID (Public access)
router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.put(
  "/update-image/:id",
  imageUpload.single("image"),
  updateImageProductById
);
// Export the router
module.exports = router;
