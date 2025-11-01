import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { setBlog } from "../redux/blogSlice";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllPublishBlogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/blog/get-published-blogs",
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        } else {
          setError("Failed to fetch blogs.");
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("An error occurred while fetching blogs.");
      } finally {
        setLoading(false);
      }
    };

    getAllPublishBlogs();
  }, [dispatch]);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl font-bold pt-10">Our Blogs</h1>
        <hr className="w-24 border-2 border-red-500 rounded-full" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 py-10 px-4 md:px-0">
        {loading && <p className="col-span-full text-center">Loading blogs...</p>}
        {error && <p className="col-span-full text-center text-red-500">{error}</p>}
        {!loading && !error && blog?.length === 0 && (
          <p className="col-span-full text-center">No blogs available.</p>
        )}
        {!loading &&
          !error &&
          blog?.map((b) => <BlogCard blog={b} key={b._id || b.id} />)}
      </div>
    </div> 
  );
};

export default Blogs;





