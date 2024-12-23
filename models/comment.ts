import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  time: { type: String, required: true },
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    required: true,
  },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
