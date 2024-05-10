const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrder,
  getOrderById,
  deleteOrder,
} = require("../controllers/orderCtrl"); // Modify controller import path as needed
const { verifyTokenAndAdmin } = require("../middleware/verifyToken"); // Modify middleware as needed

// Route: Create a new order (Public access)
router.post("/", createOrder);

// Route: Update an existing order by ID (Public access)
router.put("/:id", updateOrder);

// Route: Get an order by ID (Public access)
router.get("/:id", getOrderById);

// Route: Delete an order by ID (Public access)
router.delete("/:id", deleteOrder);

// Export the router
module.exports = router;
