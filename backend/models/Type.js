const mongoose = require("mongoose");
const joi = require("joi");

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Replace with the actual model name for your categories
    required: true,
  },
});

const Type = mongoose.model("Type", typeSchema);

const createTypeValidation = (type) => {
  const schema = joi.object({
    name: joi.string().required().trim(),
    description: joi.string().required(),
    category: joi.string().required(), // Assuming category is a string in this example
  });

  return schema.validate(type);
};

const updateTypeValidation = (type) => {
  const schema = joi
    .object({
      name: joi.string().trim(),
      description: joi.string(),
      category: joi.string(), // Assuming category is a string in this example
      // Add validation for additional properties if needed
    })
    .min(1); // at least one property is required for update

  return schema.validate(type);
};

module.exports = {
  Type,
  createTypeValidation,
  updateTypeValidation,
};
