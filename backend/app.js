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

// Load environment variables
dotenv.config({ path: ".env" });

// Connect to the database
connectWithDb();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "images")));
app.use(helmet());
app.use(cors());

// Routes for entities
app.use(errorHandler);
app.use(`${process.env.API_VERSION}categories/`, require("./routes/category"));
app.use(`${process.env.API_VERSION}sizes/`, require("./routes/size"));
app.use(`${process.env.API_VERSION}products/`, require("./routes/product"));
app.use(`${process.env.API_VERSION}brands/`, require("./routes/brand"));
app.use(`${process.env.API_VERSION}users/`, require("./routes/user"));
app.use(`${process.env.API_VERSION}auth/`, require("./routes/auth"));
app.use(`${process.env.API_VERSION}colors/`, require("./routes/color"));
app.use(`${process.env.API_VERSION}orders/`, require("./routes/order"));
// app.use(express.static(`E:\\Programming\\zamalek-store\\frontend\\build`))
// app.get("*",(req, res)=> {
//   res.sendFile(`E:\\Programming\\zamalek-store\\frontend\\build\\index.html`)
// });
// Error handling middleware

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
