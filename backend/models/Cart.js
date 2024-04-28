const mongoose = require("mongoose");
const Joi = require("joi");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
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
    subtotal: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
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
  const schema = Joi.object({
    user: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    cart: Joi.array()
      .items(
        Joi.object({
          product: Joi.string()
            .required()
            .regex(/^[0-9a-fA-F]{24}$/),
          quantity: Joi.number().required().min(1),
          totalPrice: Joi.number().required().min(0),
        })
      )
      .required(),
    totalQuantity: Joi.number().default(0),
    totalPrice: Joi.number().default(0).min(0),
    subtotal: Joi.number().default(0).min(0),
    total: Joi.number().default(0).min(0),
  });

  return schema.validate(cart);
};

const updateCartValidation = (obj) => {
  const schema = Joi.object({
    cart: Joi.array().items(
      Joi.object({
        product: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        quantity: Joi.number().min(1),
        totalPrice: Joi.number().min(0),
      })
    ),
    totalQuantity: Joi.number(),
    totalPrice: Joi.number().min(0),
    subtotal: Joi.number().min(0),
    total: Joi.number().min(0),
  });

  return schema.validate(obj);
};

module.exports = {
  Cart,
  createCartValidation,
  updateCartValidation,
};
