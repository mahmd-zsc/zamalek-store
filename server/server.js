// Require necessary modules
const express = require("express");
const dotenv = require("dotenv");
const { connectWithDb } = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

// Initialize Express app
const app = express();

// Environment Variables and Database Connection
dotenv.config({ path: ".env" });
connectWithDb();

// Express App Initialization

// Middleware
app.use(express.json()); // Parse JSON data in request body
app.use(express.static(path.join(__dirname, "images"))); // Serve images folder
app.use(helmet()); // Enhance security headers
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes for entities
app.use(`${process.env.API_VERSION}auth/`, require("./routes/auth"));
app.use(`${process.env.API_VERSION}brands/`, require("./routes/brand"));
app.use(`${process.env.API_VERSION}categories/`, require("./routes/category"));
app.use(`${process.env.API_VERSION}colors/`, require("./routes/color"));
app.use(`${process.env.API_VERSION}orders/`, require("./routes/order"));
app.use(`${process.env.API_VERSION}products/`, require("./routes/product"));
app.use(`${process.env.API_VERSION}sizes/`, require("./routes/size"));
app.use(`${process.env.API_VERSION}users/`, require("./routes/user"));

// Serving Static Files
// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

// Error handling middleware (should come after all routes)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
