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
      type: String,
      default: "unknown",
      trim: true,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type",
      required: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    discountPrice: {
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

// Define a virtual field for reviews
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "productId",
  localField: "_id",
});

const Product = mongoose.model("Product", productSchema);

const createProductValidation = (product) => {
  const schema = joi.object({
    name: joi.string().required().trim(),
    description: joi.string().required(),
    price: joi.number().required().min(0),
    sizes: joi.array().items(joi.string().required()),
    category: joi
      .string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    image: joi.object({
      url: joi.string(),
      publicId: joi.string(),
    }),
    brand: joi.string().trim(),
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
    type: joi
      .string()
      .required()
      .trim()
      .regex(/^[0-9a-fA-F]{24}$/),
    color: joi.string().required().trim(),
    discountPrice: joi.number().min(0).default(null),
  });

  return schema.validate(product);
};

const updateProductValidation = (obj) => {
  const schema = joi
    .object({
      name: joi.string().trim(),
      description: joi.string(),
      price: joi.number().min(0),
      sizes: joi.array().items(joi.string()),
      category: joi.string().regex(/^[0-9a-fA-F]{24}$/),
      image: joi.object({
        url: joi.string(),
        publicId: joi.string(),
      }),
      brand: joi.string().trim(),
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
      type: joi
        .string()
        .trim()
        .regex(/^[0-9a-fA-F]{24}$/),
      color: joi.string().trim(),
      discountPrice: joi.number().min(0),
    })
    .min(1);

  return schema.validate(obj);
};

module.exports = {
  Product,
  createProductValidation,
  updateProductValidation,
};
