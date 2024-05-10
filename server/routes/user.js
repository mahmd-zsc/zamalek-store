const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userCtrl");
const {
  verifyTokenAndAuthorization,
  verifyTokenOnlyUser,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken"); // Import the specified middleware

// Route: Get all users
router.get("/", verifyTokenAndAdmin, getAllUsers);

// Route: Get user by ID
// router.get("/:id", getUserById);
router.get("/:id", verifyTokenAndAuthorization, getUserById);

// Route: Update user by ID
router.put("/:id", verifyTokenAndAuthorization, updateUser);

// Route: Delete user by ID
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

module.exports = router;
