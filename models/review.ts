import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  coverImage: { type: String, required: true },
  title: { type: String, required: true },
  isbn: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  dateAdded: { type: Date, default: Date.now },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
