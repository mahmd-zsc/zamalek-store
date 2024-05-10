const asyncHandler = require("express-async-handler");
const {
  Cart,
  createCartValidation,
  updateCartValidation,
} = require("../models/Cart");
const { Product } = require("../models/Product");

/**
 * @desc Create a new cart
 * @route POST /api/carts
 * @access Public
 */
const createCart = asyncHandler(async (req, res) => {
  const { error } = createCartValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Extract user ID from request body
  const { user, cart, totalQuantity, totalPrice, subtotal, total } = req.body;

  // Create new cart instance
  const newCart = new Cart({
    user,
    cart,
    totalQuantity,
    totalPrice,
    subtotal,
    total,
  });

  // Save cart to the database
  const savedCart = await newCart.save();

  res
    .status(201)
    .json({ message: "Cart created successfully", data: savedCart });
});

/**
 * @desc Delete a cart by ID
 * @route DELETE /api/carts/:id
 * @access Public
 */
const deleteCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json({ message: "Cart deleted successfully" });
});

/**
 * @desc Update a cart by ID
 * @route PUT /api/carts/:id
 * @access Public
 */
const updateCart = asyncHandler(async (req, res) => {
  const { error } = updateCartValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedCart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json(updatedCart);
});

/**
 * @desc Get a cart by ID
 * @route GET /api/carts/:id
 * @access Public
 */
const getCartById = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json(cart);
});

/**
 * @desc Get all carts
 * @route GET /api/carts
 * @access Public
 */
const getAllCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find();
  res.status(200).json(carts);
});

module.exports = {
  createCart,
  deleteCart,
  updateCart,
  getCartById,
  getAllCarts,
};
