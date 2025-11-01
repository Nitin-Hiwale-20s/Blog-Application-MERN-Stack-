import { Blog } from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

// =============================
// Create Blog
// =============================
export const createBlog = async (req, res) => {
  try {
    const { title, category, subtitle, description } = req.body;

    if (!title?.trim() || !category?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required",
      });
    }

    let thumbnail;
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const uploadResult = await cloudinary.uploader.upload(fileUri, {
        resource_type: "image",
      });
      thumbnail = uploadResult.secure_url;
    }

    const blog = await Blog.create({
      title: title.trim(),
      subtitle: subtitle?.trim(),
      description: description?.trim(),
      category: category.trim(),
      author: req.userId, 
      thumbnail,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error in createBlog",
      error: error.message,
    });
  }
};

// =============================
// Update Blog
// =============================
export const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, subtitle, description, category } = req.body;
    const file = req.file;

    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found!" });
    }

    if (String(blog.author) !== req.userId) {
      return res.status(403).json({ success: false, message: "Not authorized to update this blog" });
    }

    const updateData = {
      title: title?.trim() || blog.title,
      subtitle: subtitle?.trim() || blog.subtitle,
      description: description?.trim() || blog.description,
      category: category?.trim() || blog.category,
    };

    if (file) {
      const fileUri = getDataUri(file);
      const uploadResult = await cloudinary.uploader.upload(fileUri, {
        resource_type: "image",
      });
      updateData.thumbnail = uploadResult.secure_url;
    }

    blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });

    res.status(200).json({ success: true, message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({ success: false, message: "Error updating blog", error: error.message });
  }
};

// =============================
// Get Own Blogs
// =============================
export const getOwnBlogs = async (req, res) => {
  try {
    const userId = req.userId;

    const blogs = await Blog.find({ author: userId }).populate({
      path: "author",
      select: "firstName lastName email bio photoUrl",
    });

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    console.error("Get Own Blogs Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error in getOwnBlogs",
      error: error.message,
    });
  }
};

// =============================
// Delete Blog
// =============================
// export const deleteBlog = async (req, res) => {
//   try {
//     const { blogId } = req.params;
//     const authorId = req.userId;
//     console.log("Delete request for blog ID:", req.params.id);

//     const blog = await Blog.findById(blogId);
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog not found",
//       });
//     }

//     if (blog.author.toString() !== authorId) {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized to delete this blog",
//       });
//     }

//     await Blog.findByIdAndDelete(blogId);
//     res.status(200).json({
//       success: true,
//       message: "Blog deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete Blog Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error in deleting Blog",
//       error: error.message,
//     });
//   }
// };

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;   
    const authorId = req.userId;

    console.log("Delete request for blog ID:", id);

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check ownership
    if (blog.author.toString() !== authorId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this blog",
      });
    }

    await Blog.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({
      success: false,
      message: "Error in deleting Blog",
      error: error.message,
    });
  }
};

// =============================
// Get Published Blogs
// =============================
export const getPublishedBlog = async (_, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "firstName lastName email bio photoUrl",
      });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("Get Published Blogs Error:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching published blogs",
      error: error.message,
    });
  }
};

// =============================
// Toggle Publish Blog
// =============================
export const togglePublishBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.userId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    if (blog.author.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized to perform this action" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    const statusMessage = blog.isPublished ? "published" : "unpublished";

    return res.status(200).json({
      success: true,
      message: `Blog ${statusMessage} successfully`,
      blog,
    });
  } catch (error) {
    console.error("Toggle Publish Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error in toggling blog publication",
      error: error.message,
    });
  }
};
// Like Blog
export const likeBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const userId = req.userId;

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $addToSet: { likes: userId } },
      { new: true }
    );

    if (!blog) return res.status(404).json({ message: "Blog not found", success: false });

    return res.status(200).json({ 
      message: "Blog liked", 
      success: true,
      likesCount: blog.likes.length
    });
  } catch (error) {
    console.error("Like Blog Error:", error);
    res.status(500).json({ success: false, message: "Error liking blog", error: error.message });
  }
};

// Dislike Blog
export const dislikeBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const userId = req.userId;

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { likes: userId } },
      { new: true }
    );

    if (!blog) return res.status(404).json({ message: "Blog not found", success: false });

    return res.status(200).json({ 
      message: "Blog disliked", 
      success: true,
      likesCount: blog.likes.length
    });
  } catch (error) {
    console.error("Dislike Blog Error:", error);
    res.status(500).json({ success: false, message: "Error disliking blog", error: error.message });
  }
};
// =============================
// Get My Total Blog Likes
// =============================
export const getMyTotalBlogLikes = async (req, res) => {
  try {
    const userId = req.userId;

    const myBlogs = await Blog.find({ author: userId })
      .select("likes")
      .lean();

    const totalLikes = myBlogs.reduce((acc, blog) => acc + (blog.likes?.length || 0), 0);

    res.status(200).json({
      success: true,
      data: {
        totalBlogs: myBlogs.length,
        totalLikes,
      },
    });
  } catch (error) {
    console.error("Get My Total Blog Likes Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch total blog likes",
      error: error.message,
    });
  }
};
