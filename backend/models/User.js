const mongoose = require("mongoose");
const joi = require("joi");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    // You can include additional fields based on your requirements
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model("User", userSchema);

const createUserValidation = (user) => {
  const schema = joi.object({
    username: joi.string().required().trim(),
    email: joi.string().required().email().trim(),
    password: joi.string().required(),
  });

  return schema.validate(user);
};

const updateUserValidation = (obj) => {
  const schema = joi
    .object({
      username: joi.string().trim(),
      email: joi.string().email().trim(),
      password: joi.string(),
      // Add validation for additional properties if needed
    })
    .min(1); // at least one property is required for update

  return schema.validate(obj);
};

module.exports = {
  User,
  createUserValidation,
  updateUserValidation,
};
