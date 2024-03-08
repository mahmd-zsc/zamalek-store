// product.model.js

const mongoose = require("mongoose");
const joi = require("joi");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    sizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
        isMain: {
          type: Boolean,
          default: false,
        },
      },
    ],
    brand: {
      type: String,
      default: "unknown",
      trim: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    type: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Define a virtual field for reviews
productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

const Product = mongoose.model("Product", productSchema);

const createProductValidation = (product) => {
  const schema = joi.object({
    name: joi.string().required().trim(),
    description: joi.string().required(),
    price: joi.number().required().min(0),
    sizes: joi.array().items(joi.string().required()), // Assuming size is a string in this example
    category: joi.string().required(),
    images: joi.array().items(
      joi.object({
        url: joi.string().required(),
        publicId: joi.string().required(),
        isMain: joi.boolean(),
      })
    ),
    brand: joi.string().trim(),
    stockQuantity: joi.number().min(0),
    ratings: joi.number().min(0).max(5),
    reviews: joi.array().items(
      joi.object({
        user: joi.string().required(),
        text: joi.string(),
        rating: joi.number().min(1).max(5),
        comments: joi.array().items(
          joi.object({
            user: joi.string().required(),
            text: joi.string(),
          })
        ),
      })
    ),
    tags: joi.array().items(joi.string().trim()),
    type: joi.string().required().trim(),
  });

  return schema.validate(product);
};

const updateProductValidation = (obj) => {
  const schema = joi
    .object({
      name: joi.string().trim(),
      description: joi.string(),
      price: joi.number().min(0),
      sizes: joi.array().items(joi.string()), // Assuming size is a string in this example
      category: joi.string(),
      images: joi.array().items(
        joi.object({
          url: joi.string(),
          publicId: joi.string(),
          isMain: joi.boolean(),
        })
      ),
      brand: joi.string().trim(),
      stockQuantity: joi.number().min(0),
      ratings: joi.number().min(0).max(5),
      reviews: joi.array().items(
        joi.object({
          user: joi.string(),
          text: joi.string(),
          rating: joi.number().min(1).max(5),
          comments: joi.array().items(
            joi.object({
              user: joi.string(),
              text: joi.string(),
            })
          ),
        })
      ),
      tags: joi.array().items(joi.string().trim()),
      type: joi.string().trim(),
    })
    .min(1); // at least one property is required for update

  return schema.validate(obj);
};

module.exports = {
  Product,
  createProductValidation,
  updateProductValidation,
};
