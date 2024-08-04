const mongoose = require("mongoose");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // You can include additional fields based on your requirements
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { email: this.email, id: this.id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
  );
};
const User = mongoose.model("User", userSchema);

const createUserValidation = (user) => {
  const schema = joi.object({
    username: joi.string().required().trim().min(3).max(10),
    email: joi.string().required().email().trim(),
    password: joi.string().required().min(8).max(20),
  });

  return schema.validate(user);
};

const updateUserValidation = (obj) => {
  const schema = joi
    .object({
      username: joi.string().trim().min(3).max(10),
      email: joi.string().email().trim(),
      password: joi.string().min(8).max(20),
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
