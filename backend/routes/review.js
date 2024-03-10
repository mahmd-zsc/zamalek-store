const express = require("express");
const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  toggleLikeReview,
} = require("../controllers/reviewCtrl");

const router = express.Router();

// Route: Get all reviews (Public access)
// Route: Create a new review (Public access)
router.route("/").get(getAllReviews).post(createReview);

// Route: Get, Update, and Delete a review by ID (Public access)
router.route("/:id").get(getReviewById).put(updateReview).delete(deleteReview);
router.route("/:id/like").post(toggleLikeReview);

module.exports = router;
