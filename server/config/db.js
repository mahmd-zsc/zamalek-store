let mongoose = require("mongoose");

let connectWithDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected is success to mongodb ^-^");
  } catch (error) {
    console.log("connected is failed to mongodb -_-" + error);
  }
};
/**
let connectWithDb = async () => {
  mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected is success to mongodb"))
  .catch((error) => console.log(error));
};
*/
module.exports = { connectWithDb };
