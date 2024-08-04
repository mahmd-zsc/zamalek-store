const mongoose = require("mongoose");
const joi = require("joi");

const categorySchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.virtual("products", {
  ref: "Product",
  foreignField: "category",
  localField: "_id",
});
const Category = mongoose.model("Category", categorySchema);

const createCategoryValidation = (obj) => {
  const schema = joi.object({
    name: joi.string().required().trim(),
    description: joi.string().required(),
    image: joi.object({
      url: joi.string().required(),
      publicId: joi.string().required(),
    }),
  });
  return schema.validate(obj);
};

const updateCategoryValidation = (obj) => {
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

  return schema.validate(obj);
};

module.exports = {
  Category,
  createCategoryValidation,
  updateCategoryValidation,
};
