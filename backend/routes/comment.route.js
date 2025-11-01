import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { 
  createComment, 
  deleteComment, 
  editComment, 
  getAllCommentsOnMyBlogs, 
  getCommentsOfPost, 
  likeComment 
} from "../controllers/comment.controller.js";

const router = express.Router();

// ✅ Like/Unlike a comment (keep on top because it's more specific)
router.post("/:id/like", isAuthenticated, likeComment);

// ✅ Create a comment on a post
router.post("/:postId/create", isAuthenticated, createComment);

// ✅ Delete a comment
router.delete("/:id/delete", isAuthenticated, deleteComment);


// ✅ Edit a comment
router.put("/:id/edit", isAuthenticated, editComment);
router.put("/:commentId/edit", isAuthenticated, editComment);


// ✅ Get all comments on user's blogs
router.get("/my-blogs", isAuthenticated, getAllCommentsOnMyBlogs);

// ✅ Get all comments of a specific post
router.get("/:postId/comments", getCommentsOfPost);

export default router;



