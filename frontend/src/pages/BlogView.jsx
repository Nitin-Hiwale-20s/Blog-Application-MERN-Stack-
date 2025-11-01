// import React from "react";
// import { useEffect, useState } from 'react'
// import { useParams, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { setBlog } from "../redux/blogSlice"; 


// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { Bookmark, BookMarked, MessageSquare, Share2 } from "lucide-react";
// import CommentBox from "@/components/CommentBox";

// function BlogView() {
//   const { blogId } = useParams();
//   const { blog } = useSelector((store=> store.blog));
//   const dispatch = useDispatch();
//   const {user}=useSelector(store=>store.auth)
//   const selectedBlog = blog?.find((b) => b._id === blogId);
//   const [blogLike, setBlogLike] = useState(selectedBlog.likes.length);
//   const [liked, setLiked] = useState(
//     selectedBlog.likes.includes(user._id) || false
//   );

//   if (!selectedBlog) {
//     return <div className="pt-14 max-w-6xl mx-auto p-10">Loading blog...</div>;
//   }

//   const changeTimeFormat = (isData) => {
//     const date = new Date(isData);
//     const options = { day: "numeric", month: "long", year: "numeric" };
//     const formattesDate = date.toLocaleDateString("en-GB", options);
//     return formattesDate;
//   };

//   const handleShare = (blogId) => {
//     const blogUrl = `${window.location.origin}/blog/${blogId}`;

//     if (navigator.share) {
//       navigator
//         .share({
//           title: "check out this blog! #NH",
//           text: "Read this amazing blog post ",
//           url: blogUrl,
//         })
//         .then(() => console.log("Shared Succesfully"))
//         .catch((err) => console.error("Erroe Shared:", err));
//     } else {
//       // fall Back
//       navigator.clipboard.writeText(blogUrl).then(() => {
//         toast.success("Blog link copied to clipboard");
//       });
//     }
//   };

//   const likeOrDislikeHandler = async () => {
//     try {
//       const action = liked ? "dislike" : "like";
//       const res = await axios.get(
//         `http://localhost:8000/api/v1/blog/${selectedBlog?._id}/${action}`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         const updatedLikes = liked ? blogLike - 1 : blogLike + 1;
//         setBlogLike(updatedLikes);
//         setLiked(!liked);

//         //apne blog ko update krunga
//         const updatedBlogData = blog.map((p) =>
//           p._id === selectedBlog._id
//             ? {
//                 ...p,
//                 likes: liked
//                   ? p.likes.filter((id) => id !== user._id)
//                   : [...p.likes, user._id],
//               }
//             : p
//         );
//         toast.success(res.data.message);
//         dispatch(setBlog(updatedBlogData));
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <div className="pt-14">
//       <div className="max-w-6xl mx-auto p-10">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <Link to="/">Home</Link>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <Link to="/blogs">Blogs</Link>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>

//         <div className="mt-10">
//           <h1 className="text-3xl font-bold">{selectedBlog.title}</h1>
//           <div
//             className="mt-4 prose max-w-none"
//             dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
//           />

//           <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
//             <div className="flex items-center space-x-4">
//               <Avatar>
//                 <AvatarImage src={selectedBlog.author?.photoUrl} alt="author" />
//                 <AvatarFallback>
//                   {selectedBlog.author?.firstName?.[0]}
//                   {selectedBlog.author?.lastName?.[0]}
//                 </AvatarFallback>
//               </Avatar>

//               <div>
//                 <p className="font-medium">
//                   {selectedBlog.author?.firstName}{" "}
//                   {selectedBlog.author?.lastName}
//                 </p>
//               </div>
//             </div>
//             <p className="text-sm text-muted-foreground">
//               Publsihed on {changeTimeFormat(selectedBlog.createdAt)} ~8 min
//               read
//             </p>
//           </div>
//         </div>
//         {/*Featured image*/}

//         <div className="mb-8 round-lg overflow-hidden ">
//           <img
//             src={selectedBlog.thumbnail}
//             alt="thumbnail"
//             width={1000}
//             height={500}
//             className="w-full object-cover "
//           />
//           <p className="text-sm text-muted-foreground mt-2 italic  ">
//             {selectedBlog.subtitle}
//           </p>
//         </div>
//         <p dangerouslySetInnerHTML={{ __html: selectedBlog.description }} />
//         <div className="mt-10">
//           <div className="flex flex-wrap gap-2 mb-8">
//             <Badge variant="secondarty">Next.js </Badge>
//             <Badge variant="secondarty"> React.js </Badge>
//             <Badge variant="secondarty">Java.script</Badge>
//             <Badge variant="secondarty">Node.js </Badge>
//           </div>

//           {/*Engagement*/}


//           <div className="flex items-center justify-between border-y dark:border-gray-800 border-gray-300 py-4 mb-8">
//             <div className="flex items-center space-x-4">
//               <Button
//                 onClick={likeOrDislikeHandler}
//                 variant="ghost"
//                 size="sm"
//                 className="flex items-center gap-1"
//               >
//                 {/* <Heart className="h-4 w-4"/> */}
//                 {liked ? (
//                   <FaHeart
//                     size={"24"}
//                     className="cursor-pointer text-red-600"
//                   />
//                 ) : (
//                   <FaRegHeart
//                     size={"24"}
//                     className="cursor-pointer hover:text-gray-600 text-white"
//                   />
//                 )}

//                 <span>{blogLike}</span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="flex items-center gap-1"
//               >
//                 <MessageSquare className="h-4 w-4" />
//                 {/* <span>{comment.length} Comments</span> */}

//                 <span>{selectedBlog.comments?.length || 0} Comments</span>


//               </Button>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Button variant="ghost" size="sm">
//                 <Bookmark className="h-4 w-4" />
//               </Button>
//               <Button
//                 onClick={() => handleShare(selectedBlog._id)}
//                 variant="ghost"
//                 size="sm"
//               >
//                 <Share2 className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>

//         <CommentBox selectedBlog={selectedBlog} />
//       </div>
//     </div>
//   );
// }

// export default BlogView;










import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setBlog } from "../redux/blogSlice";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Bookmark, MessageSquare, Share2 } from "lucide-react";
import CommentBox from "@/components/CommentBox";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

function BlogView() {
  const { blogId } = useParams();
  const { blog } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const selectedBlog = blog?.find((b) => b._id === blogId);

  const [blogLike, setBlogLike] = useState(selectedBlog?.likes.length || 0);
  const [liked, setLiked] = useState(
    selectedBlog?.likes.includes(user?._id) || false
  );

  if (!selectedBlog) {
    return <div className="pt-14 max-w-6xl mx-auto p-10">Loading blog...</div>;
  }

  const changeTimeFormat = (isData) => {
    const date = new Date(isData);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const handleShare = (blogId) => {
    const blogUrl = `${window.location.origin}/blog/${blogId}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this blog! #NH",
          text: "Read this amazing blog post",
          url: blogUrl,
        })
        .then(() => console.log("Shared Successfully"))
        .catch((err) => console.error("Error Sharing:", err));
    } else {
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success("Blog link copied to clipboard");
      });
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await api.post(`/blog/${selectedBlog._id}/${action}`, {});

      if (res.data.success) {
        const updatedLikes = liked ? blogLike - 1 : blogLike + 1;
        setBlogLike(updatedLikes);
        setLiked(!liked);

        // Update Redux store
        const updatedBlogData = blog.map((p) =>
          p._id === selectedBlog._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        toast.success(res.data.message);
        dispatch(setBlog(updatedBlogData));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="pt-14">
      <div className="max-w-6xl mx-auto p-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/blogs">Blogs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-10">
          <h1 className="text-3xl font-bold">{selectedBlog.title}</h1>
          <div
            className="mt-4 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
          />

          <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={selectedBlog.author?.photoUrl} alt="author" />
                <AvatarFallback>
                  {selectedBlog.author?.firstName?.[0]}
                  {selectedBlog.author?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {selectedBlog.author?.firstName} {selectedBlog.author?.lastName}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Published on {changeTimeFormat(selectedBlog.createdAt)} ~8 min read
            </p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={selectedBlog.thumbnail}
            alt="thumbnail"
            width={1000}
            height={500}
            className="w-full object-cover"
          />
          <p className="text-sm text-muted-foreground mt-2 italic">
            {selectedBlog.subtitle}
          </p>
        </div>

        <div dangerouslySetInnerHTML={{ __html: selectedBlog.description }} />

        <div className="mt-10">
          <div className="flex flex-wrap gap-2 mb-8">
            {selectedBlog.tags?.map((tag, idx) => (
              <Badge key={idx} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Engagement */}
          <div className="flex items-center justify-between border-y dark:border-gray-800 border-gray-300 py-4 mb-8">
            <div className="flex items-center space-x-4">
              <Button
                onClick={likeOrDislikeHandler}
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                {liked ? (
                  <FaHeart size={24} className="cursor-pointer text-red-600" />
                ) : (
                  <FaRegHeart
                    size={24}
                    className="cursor-pointer hover:text-gray-600 text-white"
                  />
                )}
                <span>{blogLike}</span>
              </Button>

              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{selectedBlog.comments?.length || 0} Comments</span>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleShare(selectedBlog._id)} variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <CommentBox selectedBlog={selectedBlog} />
      </div>
    </div>
  );
}

export default BlogView;
