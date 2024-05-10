const asyncHandler = require("express-async-handler");
const {
  Order,
  createOrderValidation,
  updateOrderValidation,
} = require("../models/Order");

/**
 * @desc Create a new order
 * @route POST /api/orders
 * @access Public
 */
const createOrder = asyncHandler(async (req, res) => {
  const { error } = createOrderValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Extract necessary fields from the request body
  const { products, user, totalAmount, status, paymentMethod } = req.body;

  try {
    // Create a new order instance
    const order = new Order({
      products,
      user,
      totalAmount,
      status,
      paymentMethod,
      // Add other necessary fields here
    });

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @desc Update an existing order by ID
 * @route PUT /api/orders/:id
 * @access Public
 */
const updateOrder = asyncHandler(async (req, res) => {
  const { error } = updateOrderValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Extract fields that can be updated
  const { products, totalAmount, status, paymentMethod } = req.body;

  try {
    // Find the order by ID and update its fields
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { products, totalAmount, status, paymentMethod },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @desc Get an order by ID
 * @route GET /api/orders/:id
 * @access Public
 */
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @desc Delete an order by ID
 * @route DELETE /api/orders/:id
 * @access Public
 */
const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  createOrder,
  updateOrder,
  getOrderById,
  deleteOrder,
};
