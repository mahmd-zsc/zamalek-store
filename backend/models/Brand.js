// brand.model.js

const mongoose = require("mongoose");
const joi = require("joi");

const brandSchema = new mongoose.Schema({
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
  image: {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
});

const Brand = mongoose.model("Brand", brandSchema);

const createBrandValidation = (brand) => {
  const schema = joi.object({
    name: joi.string().required().trim(),
    description: joi.string().required(),
    image: joi.object({
      url: joi.string().required(),
      publicId: joi.string().required(),
    }),
  });

  return schema.validate(brand);
};

const updateBrandValidation = (brand) => {
  const schema = joi
    .object({
      name: joi.string().trim(),
      description: joi.string(),
      image: joi.object({
        url: joi.string(),
        publicId: joi.string(),
      }),
      // Add validation for additional properties if needed
    })
    .min(1); // at least one property is required for update

  return schema.validate(brand);
};

module.exports = {
  Brand,
  createBrandValidation,
  updateBrandValidation,
};
