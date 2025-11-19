
import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  getOwnBlogs,
  getMyTotalBlogLikes,
  getPublishedBlog,
  togglePublishBlog,
} from "../controllers/blog.controller.js";
import { getAllCommentsOnMyBlogs } from "../controllers/comment.controller.js";

const router = express.Router();

// Create blog
router.post("/", isAuthenticated, createBlog);

// Update blog
router.put("/:blogId", isAuthenticated, singleUpload, updateBlog);

// Toggle publish/unpublish
router.patch("/:blogId/publish", isAuthenticated, togglePublishBlog);

// Get published blogs
router.get("/get-published-blogs", getPublishedBlog);

// Get own blogs
router.get("/get-own-blogs", isAuthenticated, getOwnBlogs);

// Get all comments on my blogs
router.get("/get-all-blogs", isAuthenticated, getAllCommentsOnMyBlogs);

// Get my blogs total likes
router.get("/my-blogs/likes", isAuthenticated, getMyTotalBlogLikes);

// Delete blog (RESTful)
// router.delete("/:id", isAuthenticated, deleteBlog);
router.delete("/delete/:id", isAuthenticated, deleteBlog);




// Like / Dislike (better with POST)

router.post("/:id/like", isAuthenticated, likeBlog);
router.post("/:id/dislike", isAuthenticated, dislikeBlog);

export default router;
