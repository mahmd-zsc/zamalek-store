// brandRoute.js

const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandById,
  getAllBrands,
} = require("../controllers/brandCtrl");

const router = express.Router();

// Route: Create a new brand
router.post("/", createBrand);

// Route: Update a brand by ID
router.put("/:id", updateBrand);

// Route: Delete a brand by ID
router.delete("/:id", deleteBrand);

// Route: Get a brand by ID
router.get("/:id", getBrandById);

// Route: Get all brands
router.get("/", getAllBrands);

module.exports = router;
