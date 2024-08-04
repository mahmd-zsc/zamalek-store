const mongoose = require("mongoose");
const joi = require("joi");

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    colorCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Color = mongoose.model("Color", colorSchema);

const createColorValidation = (obj) => {
  const schema = joi.object({
    name: joi.string().required().trim(),
    colorCode: joi.string().required(),
  });
  return schema.validate(obj);
};

const updateColorValidation = (obj) => {
  const schema = joi
    .object({
      name: joi.string().trim(),
      colorCode: joi.string(),
      // Add validation for additional properties if needed
    })
    .min(1); // at least one property is required for update

  return schema.validate(obj);
};

module.exports = {
  Color,
  createColorValidation,
  updateColorValidation,
};
