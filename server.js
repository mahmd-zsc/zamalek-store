// Require necessary modules
const express = require("express");
const dotenv = require("dotenv");
const { connectWithDb } = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config({ path: ".env" });

// Connect to the database
connectWithDb();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "images"))); // Serving images
app.use(helmet());
app.use(cors());

// Routes for entities
app.use(`${process.env.API_VERSION}categories/`, require("./routes/category"));
app.use(`${process.env.API_VERSION}sizes/`, require("./routes/size"));
app.use(`${process.env.API_VERSION}products/`, require("./routes/product"));
app.use(`${process.env.API_VERSION}brands/`, require("./routes/brand"));
app.use(`${process.env.API_VERSION}users/`, require("./routes/user"));
app.use(`${process.env.API_VERSION}auth/`, require("./routes/auth"));
app.use(`${process.env.API_VERSION}colors/`, require("./routes/color"));
app.use(`${process.env.API_VERSION}orders/`, require("./routes/order"));

// Serving static files for client build
const clientBuildPath = path.join(__dirname, "/client/build");
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
} else {
  console.error("Client build directory not found!");
}

// Error handling middleware (should come after all routes)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
