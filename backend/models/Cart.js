const mongoose = require("mongoose");
const joi = require("joi");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CardProduct", // Assuming you have a "CardProduct" model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        totalPrice: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalQuantity: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Cart = mongoose.model("Cart", cartSchema);

const createCartValidation = (cart) => {
  const schema = joi.object({
    user: joi
      .string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    items: joi.array().items(
      joi.object({
        product: joi
          .string()
          .required()
          .regex(/^[0-9a-fA-F]{24}$/),
        quantity: joi.number().required().min(1),
        totalPrice: joi.number().required().min(0),
      })
    ),
    totalQuantity: joi.number().default(0),
    totalPrice: joi.number().default(0).min(0),
  });

  return schema.validate(cart);
};

const updateCartValidation = (obj) => {
  const schema = joi.object({
    items: joi.array().items(
      joi.object({
        product: joi.string().regex(/^[0-9a-fA-F]{24}$/),
        quantity: joi.number().min(1),
        totalPrice: joi.number().min(0),
      })
    ),
    totalQuantity: joi.number(),
    totalPrice: joi.number().min(0),
  });

  return schema.validate(obj);
};

module.exports = {
  Cart,
  createCartValidation,
  updateCartValidation,
};
