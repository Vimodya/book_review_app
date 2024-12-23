import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  coverImage: { type: String, required: true },
  title: { type: String, required: true },
  isbn: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
