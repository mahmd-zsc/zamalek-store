const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    // Add other necessary fields for orders
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

const createOrderValidation = (order) => {
  const schema = Joi.object({
    products: Joi.array()
      .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
      .min(1)
      .required(),
    user: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    totalAmount: Joi.number().required().min(0),
    status: Joi.string().valid(
      "pending",
      "processing",
      "completed",
      "cancelled"
    ),
    paymentMethod: Joi.string().required(),
    // Add validation for other fields here
  });

  return schema.validate(order);
};

const updateOrderValidation = (obj) => {
  const schema = Joi.object({
    products: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    totalAmount: Joi.number().min(0),
    status: Joi.string().valid(
      "pending",
      "processing",
      "completed",
      "cancelled"
    ),
    paymentMethod: Joi.string(),
    // Add validation for other fields here
  }).min(1);

  return schema.validate(obj);
};

module.exports = {
  Order,
  createOrderValidation,
  updateOrderValidation,
};
