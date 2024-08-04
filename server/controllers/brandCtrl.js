// brandCtrl.js
const path = require("path");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const {
  Brand,
  createBrandValidation,
  updateBrandValidation,
} = require("../models/Brand");

/**
 * @desc  Create a new brand
 * @route /api/brands/
 * @method POST
 * @access Public
 */
const createBrand = asyncHandler(async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No image provided" });
  }
  const { error } = createBrandValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);
  const brand = new Brand({
    name: req.body.name,
    description: req.body.description,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  const savedBrand = await brand.save();
  res.status(201).json(savedBrand);
  fs.unlinkSync(imagePath);
});

/**
 * @desc  Update a brand by ID
 * @route /api/brands/:id
 * @method PUT
 * @access Public
 */
const updateBrand = asyncHandler(async (req, res) => {
  const { error } = updateBrandValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedBrand = await Brand.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedBrand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  res.status(200).json(updatedBrand);
});

/**
 * @desc  Delete a brand by ID
 * @route /api/brands/:id
 * @method DELETE
 * @access Public
 */
const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  res.status(200).json({ message: "Brand deleted successfully" });
});

/**
 * @desc  Get a brand by ID
 * @route /api/brands/:id
 * @method GET
 * @access Public
 */
const getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  res.status(200).json(brand);
});

/**
 * @desc  Get all brands
 * @route /api/brands/
 * @method GET
 * @access Public
 */
const getAllBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.status(200).json(brands);
});

/**
 * @desc Update the image brand By Id
 * @router /api/brands/update-image/:id
 * @method Put
 * @access private (admin)
 */
const updateImageBrandById = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ message: "Image file not found" });
  }

  let brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  if (brand.image.publicId !== null) {
    await cloudinaryRemoveImage(brand.image.publicId);
  }

  let imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  let result = await cloudinaryUploadImage(imagePath);

  brand.image = {
    url: result.secure_url,
    publicId: result.public_id,
  };

  // Add color update
  if (req.body.color) {
    brand.color = req.body.color;
  }

  await brand.save(); // Ensure brand is saved before sending response
  fs.unlinkSync(imagePath); // Remove temporary image file

  return res.status(200).json(brand);
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandById,
  getAllBrands,
  updateImageBrandById,
};
