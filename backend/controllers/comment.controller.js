
import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comment.model.js";

// =============================
// Create Comment
// =============================
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;
    const { content } = req.body;

    if (!content?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Content is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog ID" });
    }

    const blog = await Blog.findById(postId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const comment = await Comment.create({ content, userId, postId });
    await comment.populate({
      path: "userId",
      select: "firstName lastName photoUrl",
    });

    blog.comments.push(comment._id);
    await blog.save();

    res
      .status(200)
      .json({ success: true, message: "Comment added successfully", comment });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

// =============================
// Get Comments of a Post
// =============================
export const getCommentsOfPost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog ID" });
    }

    const comments = await Comment.find({ postId })
      .populate("userId", "firstName lastName photoUrl")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({
        success: true,
        message: "Comments fetched successfully",
        comments,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

// =============================
// Delete Comment
// =============================
export const deleteComment = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid comment ID" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    if (comment.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to delete this comment",
        });
    }

    await Comment.findByIdAndDelete(commentId);
    await Blog.findByIdAndUpdate(comment.postId, {
      $pull: { comments: commentId },
    });

    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};


// // =============================
// // Edit Comment
// // =============================
// export const editComment = async (req, res) => {
//   try {
//     const { commentId } = req.params;
//     const userId = req.userId;
//     const { content } = req.body;

//     if (!content?.trim())
//       return res
//         .status(400)
//         .json({ success: false, message: "Content cannot be empty" });
//     if (!mongoose.Types.ObjectId.isValid(commentId))
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid comment ID" });

//     const comment = await Comment.findById(commentId);
//     if (!comment)
//       return res
//         .status(404)
//         .json({ success: false, message: "Comment not found" });
//     if (comment.userId.toString() !== userId.toString())
//       return res
//         .status(403)
//         .json({
//           success: false,
//           message: "Not authorized to edit this comment",
//         });

//     comment.content = content.trim();
//     comment.editedAt = new Date();
//     await comment.save();

//     res
//       .status(200)
//       .json({
//         success: true,
//         message: "Comment updated successfully",
//         comment,
//       });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Internal Server Error",
//         error: error.message,
//       });
//   }
// };




// =============================
// Edit Comment (fixed)
// =============================
export const editComment = async (req, res) => {
  try {
    // Match the route parameter :id
    const { id: commentId } = req.params;  
    const userId = req.userId;
    const { content } = req.body;

    if (!content?.trim())
      return res
        .status(400)
        .json({ success: false, message: "Content cannot be empty" });

    if (!mongoose.Types.ObjectId.isValid(commentId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid comment ID" });

    const comment = await Comment.findById(commentId);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    if (comment.userId.toString() !== userId.toString())
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to edit this comment",
        });

    comment.content = content.trim();
    comment.editedAt = new Date();
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};





export const likeComment = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ success: false, message: "Invalid comment ID" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    comment.likes = comment.likes || [];

    const alreadyLiked = comment.likes.some(
      (id) => id.toString() === userId.toString()
    );

    if (alreadyLiked) {
      comment.likes = comment.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      comment.numberOfLikes = Math.max(0, comment.numberOfLikes - 1);
    } else {
      comment.likes.push(userId);
      comment.numberOfLikes = (comment.numberOfLikes || 0) + 1;
    }

    await comment.save();

    const updatedComment = await Comment.findById(commentId).populate(
      "userId",
      "firstName lastName photoUrl"
    );

    res.status(200).json({
      success: true,
      message: alreadyLiked ? "Comment unliked" : "Comment liked",
      updatedComment,
    });
  } catch (error) {
    console.error("Error liking comment:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};





// export const likeComment = async (req, res) => {
//   try {
//     const { id: commentId } = req.params; 
//     const userId = req.userId;

//     if (!mongoose.Types.ObjectId.isValid(commentId))
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid comment ID" });

//     const comment = await Comment.findById(commentId);
//     if (!comment)
//       return res
//         .status(404)
//         .json({ success: false, message: "Comment not found" });

//     const liked = comment.likes.some(
//       (id) => id.toString() === userId.toString()
//     );
//     if (liked) {
//       comment.likes = comment.likes.filter(
//         (id) => id.toString() !== userId.toString()
//       );
//       comment.numberOfLikes = Math.max(0, comment.numberOfLikes - 1);
//     } else {
//       comment.likes.push(userId);
//       comment.numberOfLikes += 1;
//     }
//   const updatedComment = await Comment.findById(commentId);

// res.status(200).json({
//   success: true,
//   message: liked ? "Comment unliked" : "Comment liked",
//   updatedComment,
// });


//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };


// =============================
// Get All Comments on My Blogs
// =============================
export const getAllCommentsOnMyBlogs = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const myBlogs = await Blog.find({ author: userId }).select("_id");
    const blogIds = myBlogs.map((blog) => blog._id);
    if (blogIds.length === 0)
      return res
        .status(200)
        .json({
          success: true,
          totalComments: 0,
          comments: [],
          message: "No blogs found for this user",
        });

    const comments = await Comment.find({ postId: { $in: blogIds } })
      .populate("userId", "firstName lastName email photoUrl")
      .populate("postId", "title")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({
        success: true,
        totalComments: comments.length,
        comments,
        message:
          comments.length === 0
            ? "No comments found"
            : "Comments fetched successfully",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to get comments",
        error: error.message,
      });
  }
};
