const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const {
  Color,
  createColorValidation,
  updateColorValidation,
} = require("../models/Color");

/**
 * @desc  Create a new color
 * @route /api/colors/
 * @method POST
 * @access Public
 */
const createColor = asyncHandler(async (req, res) => {
  const { error } = createColorValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const color = new Color({
    name: req.body.name,
    colorCode: req.body.colorCode,
  });

  const savedColor = await color.save();
  res.status(201).json(savedColor);
});

/**
 * @desc  Delete a color by ID
 * @route /api/colors/:id
 * @method DELETE
 * @access Public
 */
const deleteColor = asyncHandler(async (req, res) => {
  const color = await Color.findByIdAndDelete(req.params.id);
  if (!color) return res.status(400).json({ message: "Color not found" });

  res.status(200).send("Color deleted successfully");
});

/**
 * @desc  Update a color by ID
 * @route /api/colors/:id
 * @method PUT
 * @access Public
 */
const updateColor = asyncHandler(async (req, res) => {
  const { error } = updateColorValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updatedColor = await Color.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedColor)
    return res.status(400).json({ message: "Color not found" });

  res.status(200).json(updatedColor);
});

/**
 * @desc  Get a color by ID
 * @route /api/colors/:id
 * @method GET
 * @access Public
 */
const getColorById = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (!color) {
    return res.status(400).json({ message: "Color not found" });
  }

  res.status(200).json(color);
});

/**
 * @desc  Get all colors
 * @route /api/colors/
 * @method GET
 * @access Public
 */
const getAllColors = asyncHandler(async (req, res) => {
  const colors = await Color.find();
  res.status(200).json(colors);
});

module.exports = {
  createColor,
  deleteColor,
  updateColor,
  getColorById,
  getAllColors,
};
