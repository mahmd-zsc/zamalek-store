const mongoose = require("mongoose");
const joi = require("joi");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  // Add more properties as needed
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Review = mongoose.model("Review", reviewSchema);

const validateReview = (review) => {
  const schema = joi.object({
    user: joi.string().required(),
    text: joi.string().required(),
    rating: joi.number().required().min(1).max(5),
    // Add validation for additional properties if needed
    productId: joi.string().required(),
    likes: joi.array().items(joi.string()), // Assuming User ID for likes
  });

  return schema.validate(review);
};

const updateReviewValidation = (obj) => {
  const schema = joi
    .object({
      user: joi.string(),
      text: joi.string(),
      rating: joi.number().min(1).max(5),
      // Add validation for additional properties if needed
      productId: joi.string(),
      likes: joi.array().items(joi.string()), // Assuming User ID for likes
    })
    .min(1); // at least one property is required for update

  return schema.validate(obj);
};

module.exports = {
  Review,
  validateReview,
  updateReviewValidation,
};
