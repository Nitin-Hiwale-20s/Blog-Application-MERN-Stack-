// import * as Avatar from "@radix-ui/react-avatar";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Textarea } from "./ui/textarea";
// import { Button } from "./ui/button";
// import { LuSend } from "react-icons/lu";
// import { FaRegHeart } from "react-icons/fa6";
// import { setComment } from "@/redux/commentSlice";
// import { setBlog } from "@/redux/blogSlice";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// function CommentBox({ selectedBlog }) {
//   const { user } = useSelector((store) => store.auth);
//   const { comment } = useSelector((store) => store.comment);
//   const { blog: blogs } = useSelector((store) => store.blog);

//   const [content, setContent] = useState("");
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editContent, setEditContent] = useState("");
//   const dispatch = useDispatch();

//   const JSON_CONFIG = {
//     headers: { "Content-Type": "application/json" },
//     withCredentials: true,
//   };

//   // -------------------------
//   // Add Comment Handler
//   // -------------------------
//   const commentHandler = async () => {
//     const trimmed = content?.trim();
//     if (!trimmed) return;

//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/comment/${selectedBlog._id}/create`,
//         { content: trimmed },
//         JSON_CONFIG
//       );

//       if (res.data.success) {
//         const updatedCommentData = comment?.length ? [...comment, res.data.comment] : [res.data.comment];
//         dispatch(setComment(updatedCommentData));

//         // update blogs slice
//         const updatedBlogData = blogs.map((b) =>
//           b._id === selectedBlog._id ? { ...b, comments: updatedCommentData } : b
//         );
//         dispatch(setBlog(updatedBlogData));

//         toast.success(res.data.message || "Comment added");
//         setContent("");
//       }
//     } catch (error) {
//       console.error("Add comment error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Comment not added");
//     }
//   };

//   // -------------------------
//   // Like/Unlike Handler
//   // -------------------------

// const likeHandler = async (commentId) => {
//   try {
//     const res = await axios.post(
//       `http://localhost:8000/api/v1/comment/${commentId}/like`,
//       {},
//       JSON_CONFIG
//     );

//     if (res.data.success) {
//       const updatedComment = res.data.updatedComment; 

//       if (!updatedComment?._id) {
//         throw new Error("Updated comment data is missing");
//       }

//       const updatedComments = comment.map((c) =>
//         c._id === updatedComment._id ? updatedComment : c
//       );

//       dispatch(setComment(updatedComments));

//       const updatedBlogData = blogs.map((b) =>
//         b._id === selectedBlog._id ? { ...b, comments: updatedComments } : b
//       );
//       dispatch(setBlog(updatedBlogData));

//       toast.success(res.data.message || "Like updated");
//     }
//   } catch (error) {
//     console.error("Like comment error:", error.response?.data || error.message);
//     toast.error(error.response?.data?.message || error.message || "Something went wrong");
//   }
// };

//   // -------------------------
//   // Edit Comment Handler
//   // -------------------------
//   // const editHandler = async (commentId) => {
//   //   const trimmed = editContent?.trim();
//   //   if (!trimmed) {
//   //     toast.error("Comment cannot be empty");
//   //     return;
//   //   }

//   //   try {
//   //     const res = await axios.put(
//   //       `http://localhost:8000/api/v1/comment/${commentId}/edit`,
//   //       { content: trimmed },
//   //       JSON_CONFIG
//   //     );

//   //     if (res.data.success) {
//   //       const updatedComment = res.data.comment;
//   //       const updatedComments = comment.map((c) => (c._id === updatedComment._id ? updatedComment : c));
//   //       dispatch(setComment(updatedComments));

//   //       const updatedBlogData = blogs.map((b) =>
//   //         b._id === selectedBlog._id ? { ...b, comments: updatedComments } : b
//   //       );
//   //       dispatch(setBlog(updatedBlogData));

//   //       toast.success(res.data.message || "Comment updated");
//   //       setEditingCommentId(null);
//   //       setEditContent("");
//   //     }
//   //   } catch (error) {
//   //     console.error("Edit comment error:", error.response?.data || error.message);
//   //     toast.error(error.response?.data?.message || "Failed to update comment");
//   //   }
//   // };


// const editHandler = async (commentId) => {
//   if (!commentId) {
//     toast.error("Comment ID is missing");
//     return;
//   }

//   const trimmed = editContent?.trim();
//   if (!trimmed) {
//     toast.error("Comment cannot be empty");
//     return;
//   }

//   console.log("Editing commentId:", commentId);

//   try {
//     const res = await axios.put(
//       `http://localhost:8000/api/v1/comment/${commentId}/edit`,
//       { content: trimmed },
//       JSON_CONFIG
//     );

//     if (res.data.success) {
//       const updatedComment = res.data.comment;
//       if (!updatedComment?._id) {
//         throw new Error("Updated comment missing _id");
//       }

//       const updatedComments = comment.map(c =>
//         c._id === updatedComment._id ? updatedComment : c
//       );
//       dispatch(setComment(updatedComments));

//       const updatedBlogData = blogs.map(b =>
//         b._id === selectedBlog._id ? { ...b, comments: updatedComments } : b
//       );
//       dispatch(setBlog(updatedBlogData));

//       toast.success(res.data.message || "Comment updated");
//       setEditingCommentId(null);
//       setEditContent("");
//     }
//   } catch (error) {
//     console.error("Edit comment error:", error.response?.data || error.message);
//     toast.error(error.response?.data?.message || "Failed to update comment");
//   }
// };


//   // -------------------------
//   // Delete Comment Handler
//   // -------------------------
//   // const deleteHandler = async (commentId) => {
//   //   try {
//   //     const res = await axios.delete(
//   //       `http://localhost:8000/api/v1/comment/${commentId}/delete`,
//   //       JSON_CONFIG
//   //     );

//   //     if (res.data.success) {
//   //       const updatedComments = comment.filter((c) => c._id !== commentId);
//   //       dispatch(setComment(updatedComments));

//   //       const updatedBlogData = blogs.map((b) =>
//   //         b._id === selectedBlog._id ? { ...b, comments: updatedComments } : b
//   //       );
//   //       dispatch(setBlog(updatedBlogData));

//   //       toast.success(res.data.message || "Comment deleted");
//   //     }
//   //   } catch (error) {
//   //     console.error("Delete comment error:", error.response?.data || error.message);
//   //     toast.error(error.response?.data?.message || "Failed to delete comment");
//   //   }
//   // };


// const deleteHandler = async (commentItem) => {
//   const id = commentItem?._id || commentItem; // handle object or string
//   if (!id || id.length !== 24) {
//     toast.error("Invalid comment ID");
//     return;
//   }

//   try {
//     const res = await axios.delete(
//       `http://localhost:8000/api/v1/comment/${id}/delete`,
//       JSON_CONFIG
//     );

//     if (res.data.success) {
//       const updatedComments = comment.filter(c => c._id !== id); // use comment from Redux
//       dispatch(setComment(updatedComments));

//       const updatedBlogData = blogs.map(b =>
//         b._id === selectedBlog._id ? { ...b, comments: updatedComments } : b
//       );
//       dispatch(setBlog(updatedBlogData));

//       toast.success(res.data.message || "Comment deleted");
//     }
//   } catch (error) {
//     console.error("Delete comment error:", error.response?.data || error.message);
//     toast.error(error.response?.data?.message || "Failed to delete comment");
//   }
// };


//   // -------------------------
//   // Fetch All Comments
//   // -------------------------
//   useEffect(() => {
//     if (!selectedBlog?._id) return;
//     const getAllComments = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8000/api/v1/comment/${selectedBlog._id}/comments`,
//           { withCredentials: true }
//         );
//         dispatch(setComment(res.data.comments || []));
//       } catch (error) {
//         console.error("Fetch comments error:", error.response?.data || error.message);
//       }
//     };
//     getAllComments();
//   }, [dispatch, selectedBlog?._id]);

//   return (
//     <div>
//       {/* User Info */}
//       <div className="flex gap-4 mb-4 items-center">
//         <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden">
//           <Avatar.Image
//             src={user?.photoUrl}
//             alt={`${user?.firstName || ""} ${user?.lastName || ""}`}
//             className="w-full h-full object-cover"
//           />
//           <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-gray-300 text-sm text-gray-600">
//             {user?.firstName?.[0]?.toUpperCase() || "?"}
//           </Avatar.Fallback>
//         </Avatar.Root>
//         <h3 className="font-semibold">{user?.firstName} {user?.lastName}</h3>
//       </div>

//       {/* Comment Input */}
//       <div className="flex gap-3">
//         <Textarea
//           placeholder="Leave a comment"
//           className="bg-gray-100 dark:bg-gray-800"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <Button onClick={commentHandler} disabled={!content.trim()}>
//           <LuSend />
//         </Button>
//       </div>

//       {/* Comments List */}
//       {comment?.length > 0 && (
//         <div className="mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md">
//           {comment.map((item) => (
//             <div key={item._id} className="mb-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex gap-3 items-start">
//                   <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden">
//                     <Avatar.Image
//                       src={item?.userId?.photoUrl || "/default-avatar.png"}
//                       alt={`${item?.userId?.firstName || "User"} avatar`}
//                       className="w-full h-full object-cover"
//                     />
//                     <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-gray-300 text-sm text-gray-600">
//                       {item?.userId?.firstName?.[0] || "U"}
//                     </Avatar.Fallback>
//                   </Avatar.Root>

//                   <div className="mb-2 space-y-1 md:w-[400px]">
//                     <h1 className="font-semibold">
//                       {item?.userId?.firstName} {item?.userId?.lastName}
//                       <span className="text-sm ml-2 font-light">
//                         {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
//                       </span>
//                     </h1>

//                     {/* Edit Mode */}
//                     {editingCommentId === item._id ? (
//                       <div className="flex gap-2">
//                         <Textarea
//                           value={editContent}
//                           onChange={(e) => setEditContent(e.target.value)}
//                           placeholder="Edit your comment"
//                         />
//                         <Button
//                           onClick={() => editHandler(item._id)}
//                           disabled={!editContent.trim()}
//                         >
//                           Save
//                         </Button>
//                         <Button
//                           variant="secondary"
//                           onClick={() => {
//                             setEditingCommentId(null);
//                             setEditContent("");
//                           }}
//                         >
//                           Cancel
//                         </Button>
//                       </div>
//                     ) : (
//                       <>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">{item?.content}</p>
//                         <div className="flex gap-5 items-center">
//                           <div
//                             className="flex gap-1 items-center cursor-pointer"
//                             onClick={() => likeHandler(item._id)}
//                           >
//                             <FaRegHeart />
//                             <span>{item.numberOfLikes}</span>
//                           </div>

//                           {item?.userId?._id === user?._id && (
//                             <>
//                               <p
//                                 className="cursor-pointer text-sm text-blue-500"
//                                 onClick={() => {
//                                   setEditingCommentId(item._id);
//                                   setEditContent(item.content);
//                                 }}
//                               >
//                                 Edit
//                               </p>
//                               <p
//                                 className="cursor-pointer text-sm text-red-500"
//                                 onClick={() => deleteHandler(item._id)}
//                               >
//                                 Delete
//                               </p>
//                             </>
//                           )}
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default CommentBox;










import * as Avatar from "@radix-ui/react-avatar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LuSend } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { setComment } from "@/redux/commentSlice";
import { setBlog } from "@/redux/blogSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

function CommentBox({ selectedBlog }) {
  const { user } = useSelector((store) => store.auth);
  const { comment } = useSelector((store) => store.comment);
  const { blog: blogs } = useSelector((store) => store.blog);

  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const dispatch = useDispatch();

  const JSON_CONFIG = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  // -------------------------
  // Add Comment
  // -------------------------
  const commentHandler = async () => {
    const trimmed = content.trim();
    if (!trimmed) return;

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/comment/${selectedBlog._id}/create`,
        { content: trimmed },
        JSON_CONFIG
      );

      if (res.data.success) {
        const updatedComments = comment ? [...comment, res.data.comment] : [res.data.comment];
        dispatch(setComment(updatedComments));

        const updatedBlogs = blogs.map((b) =>
          b._id === selectedBlog._id ? { ...b, comments: updatedComments } : b
        );
        dispatch(setBlog(updatedBlogs));

        toast.success(res.data.message || "Comment added");
        setContent("");
      }
    } catch (err) {
      console.error("Add comment error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Comment not added");
    }
  };

  // -------------------------
  // Like/Unlike Comment
  // -------------------------
  const likeHandler = async (commentId) => {
    if (!commentId) return;

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/comment/${commentId}/like`,
        {},
        JSON_CONFIG
      );

      if (res.data.success) {
        const updatedComment = res.data.updatedComment;
        const updatedComments = comment.map((c) =>
          c._id === updatedComment._id ? updatedComment : c
        );
        dispatch(setComment(updatedComments));

        const updatedBlogs = blogs.map((b) =>
          b._id === selectedBlog._id ? { ...b, comments: updatedComments } : b
        );
        dispatch(setBlog(updatedBlogs));
        toast.success(res.data.message || "Like updated");
      }
    } catch (err) {
      console.error("Like comment error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // -------------------------
  // Edit Comment
  // -------------------------
  const editHandler = async (commentId) => {
    const trimmed = editContent.trim();
    if (!commentId || !trimmed) {
      toast.error("Invalid comment or empty content");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/comment/${commentId}/edit`,
        { content: trimmed },
        JSON_CONFIG
      );

      if (res.data.success) {
        const updatedComment = res.data.comment;
        const updatedComments = comment.map((c) =>
          c._id === updatedComment._id ? updatedComment : c
        );
        dispatch(setComment(updatedComments));

        const updatedBlogs = blogs.map((b) =>
          b._id === selectedBlog._id ? { ...b, comments: updatedComments } : b
        );
        dispatch(setBlog(updatedBlogs));

        toast.success(res.data.message || "Comment updated");
        setEditingCommentId(null);
        setEditContent("");
      }
    } catch (err) {
      console.error("Edit comment error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to update comment");
    }
  };

  // -------------------------
  // Delete Comment
  // -------------------------
  const deleteHandler = async (commentId) => {
    if (!commentId || commentId.length !== 24) {
      toast.error("Invalid comment ID");
      return;
    }

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/comment/${commentId}/delete`,
        JSON_CONFIG
      );

      if (res.data.success) {
        const updatedComments = comment.filter((c) => c._id !== commentId);
        dispatch(setComment(updatedComments));

        const updatedBlogs = blogs.map((b) =>
          b._id === selectedBlog._id ? { ...b, comments: updatedComments } : b
        );
        dispatch(setBlog(updatedBlogs));

        toast.success(res.data.message || "Comment deleted");
      }
    } catch (err) {
      console.error("Delete comment error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to delete comment");
    }
  };

  // -------------------------
  // Fetch All Comments
  // -------------------------
  useEffect(() => {
    if (!selectedBlog?._id) return;

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/comment/${selectedBlog._id}/comments`,
          { withCredentials: true }
        );
        dispatch(setComment(res.data.comments || []));
      } catch (err) {
        console.error("Fetch comments error:", err.response?.data || err.message);
      }
    };
    fetchComments();
  }, [dispatch, selectedBlog?._id]);

  return (
    <div>
      {/* User Info */}
      <div className="flex gap-4 mb-4 items-center">
        <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden">
          <Avatar.Image
            src={user?.photoUrl}
            alt={`${user?.firstName || ""} ${user?.lastName || ""}`}
            className="w-full h-full object-cover"
          />
          <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-gray-300 text-sm text-gray-600">
            {user?.firstName?.[0]?.toUpperCase() || "?"}
          </Avatar.Fallback>
        </Avatar.Root>
        <h3 className="font-semibold">{user?.firstName} {user?.lastName}</h3>
      </div>

      {/* Comment Input */}
      <div className="flex gap-3">
        <Textarea
          placeholder="Leave a comment"
          className="bg-gray-100 dark:bg-gray-800"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={commentHandler} disabled={!content.trim()}>
          <LuSend />
        </Button>
      </div>

      {/* Comments List */}
      {comment?.length > 0 && (
        <div className="mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md">
          {comment.map((item) => (
            <div key={item._id} className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-start">
                  <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden">
                    <Avatar.Image
                      src={item?.userId?.photoUrl || "/default-avatar.png"}
                      alt={`${item?.userId?.firstName || "User"} avatar`}
                      className="w-full h-full object-cover"
                    />
                    <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-gray-300 text-sm text-gray-600">
                      {item?.userId?.firstName?.[0] || "U"}
                    </Avatar.Fallback>
                  </Avatar.Root>

                  <div className="mb-2 space-y-1 md:w-[400px]">
                    <h1 className="font-semibold">
                      {item?.userId?.firstName} {item?.userId?.lastName}
                      <span className="text-sm ml-2 font-light">
                        {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                      </span>
                    </h1>

                    {editingCommentId === item._id ? (
                      <div className="flex gap-2">
                        <Textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                        />
                        <Button onClick={() => editHandler(item._id)} disabled={!editContent.trim()}>
                          Save
                        </Button>
                        <Button variant="secondary" onClick={() => { setEditingCommentId(null); setEditContent(""); }}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item?.content}</p>
                        <div className="flex gap-5 items-center">
                          <div className="flex gap-1 items-center cursor-pointer" onClick={() => likeHandler(item._id)}>
                            <FaRegHeart />
                            <span>{item.numberOfLikes}</span>
                          </div>

                          {item?.userId?._id === user?._id && (
                            <>
                              <p className="cursor-pointer text-sm text-blue-500" onClick={() => { setEditingCommentId(item._id); setEditContent(item.content); }}>
                                Edit
                              </p>
                              <p className="cursor-pointer text-sm text-red-500" onClick={() => deleteHandler(item._id)}>
                                Delete
                              </p>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentBox;
