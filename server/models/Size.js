const mongoose = require("mongoose");
const joi = require("joi");

const sizeSchema = new mongoose.Schema({
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
});

const Size = mongoose.model("Size", sizeSchema);

const createSizeValidation = (obj) => {
  const schema = joi.object({
    name: joi.string().required().trim(),
    description: joi.string().required(),
    // Add validation for additional properties if needed
  });

  return schema.validate(obj);
};

const updateSizeValidation = (obj) => {
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
  Size,
  createSizeValidation,
  updateSizeValidation,
};
