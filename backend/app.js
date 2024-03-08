let express = require("express");
let dotenv = require("dotenv");
const { connectWithDb } = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

let app = express();
app.use(express.json());
dotenv.config({ path: ".env" });
connectWithDb();
app.use(errorHandler);

// app.use(`${process.env.API_VERSION}/Categories/`, require("./routes/category"));
app.use(`${process.env.API_VERSION}categories/`, require("./routes/category"));
app.use(`${process.env.API_VERSION}sizes/`, require("./routes/size"));
app.use(`${process.env.API_VERSION}products/`, require("./routes/product"));
app.use(`${process.env.API_VERSION}reviews/`, require("./routes/review"));
app.use(`${process.env.API_VERSION}types/`, require("./routes/type"));
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
