// type.controller.js

const asyncHandler = require("express-async-handler");
const {
  Type,
  createTypeValidation,
  updateTypeValidation,
} = require("../models/Type");

/**
 * @desc  Create a new type
 * @route /api/types/
 * @method POST
 * @access Public
 */
const createType = asyncHandler(async (req, res) => {
  const { error } = createTypeValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const type = new Type({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
  });

  const savedType = await type.save();
  res.status(201).json(savedType);
});

/**
 * @desc  Delete a type by ID
 * @route /api/types/:id
 * @method DELETE
 * @access Public
 */
const deleteType = asyncHandler(async (req, res) => {
  const type = await Type.findByIdAndDelete(req.params.id);
  if (!type) return res.status(400).json({ message: "Type not found" });

  res.status(200).send("Type deleted successfully");
});

/**
 * @desc  Update a type by ID
 * @route /api/types/:id
 * @method PUT
 * @access Public
 */
const updateType = asyncHandler(async (req, res) => {
  const { error } = updateTypeValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updatedType = await Type.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedType) return res.status(400).json({ message: "Type not found" });

  res.status(200).json(updatedType);
});

/**
 * @desc  Get a type by ID
 * @route /api/types/:id
 * @method GET
 * @access Public
 */
const getTypeById = asyncHandler(async (req, res) => {
  const type = await Type.findById(req.params.id)
    .populate("category")
    .populate("products");
  if (!type) {
    return res.status(400).json({ message: "Type not found" });
  }

  res.status(200).json(type);
});

/**
 * @desc  Get all types
 * @route /api/types/
 * @method GET
 * @access Public
 */
const getAllTypes = asyncHandler(async (req, res) => {
  const types = await Type.find().populate("category");
  res.status(200).json(types);
});

module.exports = {
  createType,
  deleteType,
  updateType,
  getTypeById,
  getAllTypes,
};
