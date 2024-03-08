// type.route.js

const express = require("express");
const {
  getAllTypes,
  getTypeById,
  createType,
  updateType,
  deleteType,
} = require("../controllers/typeCtrl");
const router = express.Router();

// Route: Get all types (Public access)
// Route: Create a new type (Public access)
router.route("/").get(getAllTypes).post(createType);

// Route: Get, Update, and Delete a type by ID (Public access)
router.route("/:id").get(getTypeById).put(updateType).delete(deleteType);

module.exports = router;
