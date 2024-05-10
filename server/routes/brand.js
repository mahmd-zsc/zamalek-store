// brandRoute.js
const { imageUpload } = require("../middleware/uploadImage");

const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandById,
  getAllBrands,
  updateImageBrandById,
} = require("../controllers/brandCtrl");

const router = express.Router();

// Route: Create a new brand
router.post("/", imageUpload.single("image"), createBrand);

// Route: Update a brand by ID
router.put("/:id", updateBrand);

// Route: Delete a brand by ID
router.delete("/:id", deleteBrand);

// Route: Get a brand by ID
router.get("/:id", getBrandById);

// Route: Get all brands
router.get("/", getAllBrands);
// route : update image of brand
router.put(
  "/update-image/:id",
  imageUpload.single("image"),
  updateImageBrandById
);
module.exports = router;
