const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authCtrl");

// Route: Register a new user
router.post("/register", register);

// Route: Login
router.post("/login", login);

module.exports = router;
