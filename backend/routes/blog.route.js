

// import express from "express";

// import { isAuthenticated } from "../middleware/isAuthenticated.js";
// import { singleUpload } from "../middleware/multer.js";
// import {
//   createBlog,
//   updateBlog,
//   deleteBlog,
//   likeBlog,
//   dislikeBlog,
//   getOwnBlogs,
//   getMyTotalBlogLikes,
//   getPublishedBlog,
//   togglePublishBlog,
// } from "../controllers/blog.controller.js";
// import { getAllCommentsOnMyBlogs } from "../controllers/comment.controller.js";

// const router = express.Router();

// router.route("/").post(isAuthenticated, createBlog);
// router.route("/:blogId").put(isAuthenticated, singleUpload, updateBlog);
// router.route("/:blogId").patch(togglePublishBlog);
//  router.route("/get-all-blogs").get(getAllCommentsOnMyBlogs);
// router.route("/get-published-blogs").get(getPublishedBlog);
// router.route("/get-own-blogs").get(isAuthenticated, getOwnBlogs);

// router.route("/delete/:id").delete(isAuthenticated, deleteBlog);
// router.get("/:id/like", isAuthenticated, likeBlog);
// router.get("/:id/dislike", isAuthenticated, dislikeBlog);
// router.get("/my-blogs/likes", isAuthenticated, getMyTotalBlogLikes);






// export default router;











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
