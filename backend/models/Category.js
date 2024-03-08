const mongoose = require("mongoose");
const joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  // You can replace 'Product' with the actual model name for your products
});

const Category = mongoose.model("Category", categorySchema);

const createCategoryValidation = (obj) => {
  const schema = joi.object({
    name: joi.string().required().trim(),
    description: joi.string().required(),
  });
  return schema.validate(obj);
};

const updateCategoryValidation = (obj) => {
  const schema = joi
    .object({
      name: joi.string().trim(),
      description: joi.string(),
      // Add validation for additional properties if needed
    })
    .min(1); // at least one property is required for update

  return schema.validate(obj);
};

module.exports = {
  Category,
  createCategoryValidation,
  updateCategoryValidation,
};