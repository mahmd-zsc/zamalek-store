const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const {
  Size,
  createSizeValidation,
  updateSizeValidation,
} = require("../models/Size");

/**
 * @desc  Create a new size
 * @route /api/sizes/
 * @method POST
 * @access Public
 */
const createSize = asyncHandler(async (req, res) => {
  const { error } = createSizeValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const size = new Size({
    name: req.body.name,
    description: req.body.description,
  });

  const savedSize = await size.save();
  res.status(201).json(savedSize);
});

/**
 * @desc  Delete a size by ID
 * @route /api/sizes/:id
 * @method DELETE
 * @access Public
 */
const deleteSize = asyncHandler(async (req, res) => {
  const size = await Size.findByIdAndDelete(req.params.id);
  if (!size) return res.status(400).json({ message: "Size not found" });

  res.status(200).send("Size deleted successfully");
});

/**
 * @desc  Update a size by ID
 * @route /api/sizes/:id
 * @method PUT
 * @access Public
 */
const updateSize = asyncHandler(async (req, res) => {
  const { error } = updateSizeValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updatedSize = await Size.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedSize) return res.status(400).json({ message: "Size not found" });

  res.status(200).json(updatedSize);
});

/**
 * @desc  Get a size by ID
 * @route /api/sizes/:id
 * @method GET
 * @access Public
 */
const getSizeById = asyncHandler(async (req, res) => {
  const size = await Size.findById(req.params.id);
  if (!size) {
    return res.status(400).json({ message: "Size not found" });
  }

  res.status(200).json(size);
});

/**
 * @desc  Get all sizes
 * @route /api/sizes/
 * @method GET
 * @access Public
 */
const getAllSizes = asyncHandler(async (req, res) => {
  const sizes = await Size.find();
  res.status(200).json(sizes);
});

module.exports = {
  createSize,
  deleteSize,
  updateSize,
  getSizeById,
  getAllSizes,
};
