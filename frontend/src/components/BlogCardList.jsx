import { Subtitles } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Navigate } from "react-router-dom";

function BlogCardList({ blog }) {
  return (
    <div className="bg-white dark:bg-gray-700 dark:border-gray-600 flex flex-col md:flex-row md:gap-10 p-5 rounded-2xl mt-6 shadow-lg border transition-all">
      <div>
        <img
          src={blog.thumbnail}
          alt=""
          className="rounded-lg md:w-[300px] hover:scale-105 transitiob-all  "
        />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mt-3 md:mt-1">{blog.title}</h2>
        <h3 className="text-gray-500 mt-1">{blog.Subtitles}</h3>
        <Button
          onClick={() => Navigate(`/blog/${blog._id}`)}
          classsName="mt-4 px-4 py-2 rounded-lg text-sm">
          Read More
        </Button>
      </div>
    </div>
  );
}

export default BlogCardList;
