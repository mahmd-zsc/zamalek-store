let express = require("express");
let dotenv = require("dotenv");
const { connectWithDb } = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
let helmet = require("helmet");
let cors = require("cors");
let path = require("path");
let app = express();
app.use(express.json());
dotenv.config({ path: ".env" });
connectWithDb();
app.use(errorHandler);
app.use(express.static(path.join(__dirname, "images")));
app.use(helmet());
app.use(cors());

// Routes for entities
app.use(`${process.env.API_VERSION}categories/`, require("./routes/category"));
app.use(`${process.env.API_VERSION}sizes/`, require("./routes/size"));
app.use(`${process.env.API_VERSION}products/`, require("./routes/product"));
app.use(`${process.env.API_VERSION}brands/`, require("./routes/brand"));
app.use(`${process.env.API_VERSION}users/`, require("./routes/user")); // Add the user route
app.use(`${process.env.API_VERSION}auth/`, require("./routes/auth")); // Add the auth route
app.use(`${process.env.API_VERSION}colors/`, require("./routes/color")); // Add the auth route
app.use(`${process.env.API_VERSION}orders/`, require("./routes/order")); // Add the auth route

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
