

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // likes: { type: Array, default: [] },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    numberOfLikes: { type: Number, default: 0 },
     editedAt: { type: Date },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema); 










