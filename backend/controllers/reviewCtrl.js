const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const {
  Review,
  validateReview,
  updateReviewValidation,
} = require("../models/Review");

/**
 * @desc  Create a new review
 * @route /api/reviews/
 * @method POST
 * @access Public
 */
const createReview = asyncHandler(async (req, res) => {
  const { error } = validateReview(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const review = new Review({
    user: req.body.user,
    productId: req.body.productId,
    text: req.body.text,
    rating: req.body.rating,
    likes: req.body.likes || 0,
  });

  const savedReview = await review.save();
  res.status(201).json(savedReview);
});

/**
 * @desc  Delete a review by ID
 * @route /api/reviews/:id
 * @method DELETE
 * @access Public
 */
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return res.status(400).json({ message: "Review not found" });

  res.status(200).send("Review deleted successfully");
});

/**
 * @desc  Update a review by ID
 * @route /api/reviews/:id
 * @method PUT
 * @access Public
 */
const updateReview = asyncHandler(async (req, res) => {
  const { error } = updateReviewValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedReview)
    return res.status(400).json({ message: "Review not found" });

  res.status(200).json(updatedReview);
});

/**
 * @desc  Get a review by ID
 * @route /api/reviews/:id
 * @method GET
 * @access Public
 */
const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(400).json({ message: "Review not found" });

  res.status(200).json(review);
});

/**
 * @desc  Get all reviews
 * @route /api/reviews/
 * @method GET
 * @access Public
 */
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
});

module.exports = {
  createReview,
  deleteReview,
  updateReview,
  getReviewById,
  getAllReviews,
};
