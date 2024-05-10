const mongoose = require("mongoose");
const joi = require("joi");

const productSchema = new mongoose.Schema(
  {
    title: {
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
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      url: {
        type: String,
        default: null,
      },
      publicId: {
        type: String,
        default: null,
      },
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color", // Reference to the Color model
      required: true,
    },
    discount: {
      type: Number,
      default: null,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model("Product", productSchema);

const createProductValidation = (product) => {
  const schema = joi.object({
    title: joi.string().required().trim(),
    description: joi.string().required(),
    price: joi.number().required().min(0),
    sizes: joi
      .array()
      .items(joi.string().regex(/^[0-9a-fA-F]{24}$/))
      .single(),
    category: joi
      .string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    image: joi.object({
      url: joi.string(),
      publicId: joi.string(),
    }),
    // Making brand optional
    brand: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .optional(),
    color: joi
      .string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/), // Validate color as ObjectId
    discount: joi.number().min(0).default(null),
  });

  return schema.validate(product);
};

const updateProductValidation = (obj) => {
  const schema = joi
    .object({
      title: joi.string().trim(),
      description: joi.string(),
      price: joi.number().min(0),
      sizes: joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/)),
      category: joi.string().regex(/^[0-9a-fA-F]{24}$/),
      image: joi.object({
        url: joi.string(),
        publicId: joi.string(),
      }),
      brand: joi.string().trim(),
      color: joi
        .string()
        .trim()
        .regex(/^[0-9a-fA-F]{24}$/), // Validate color as ObjectId
      discount: joi.number().min(0),
    })
    .min(1);

  return schema.validate(obj);
};

module.exports = {
  Product,
  createProductValidation,
  updateProductValidation,
};
