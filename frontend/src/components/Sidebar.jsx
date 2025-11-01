import { ChartColumnBig, Command, SquareUser } from "lucide-react";
import React from "react";
import { FaCommentAlt, FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="hidden mt-10 fixed md:block border-r-2 dark:bg-gray-800 bg-white border-gray-300 dark:border-gray-600 w-[300px] p-10 space-y-2 h-screen z-10">
      <div className="text-center pt-10 px-3 space-y-2">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `text-2xl px-4 py-2 block rounded ${
              isActive
                ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
                : "bg-transparent text-black dark:text-white"
            } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <SquareUser />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/dashboard/your-blogs"
          className={({ isActive }) =>
            `text-2xl px-4 py-2 block rounded ${
              isActive
                ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
                : "bg-transparent text-black dark:text-white"
            } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <ChartColumnBig />
          <span>Your Blogs</span>
        </NavLink>
        <NavLink
          to="/dashboard/camments"
          className={({ isActive }) =>
            `text-2xl px-4 py-2 block rounded ${
              isActive
                ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
                : "bg-transparent text-black dark:text-white"
            } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <FaCommentAlt />
          <span>Comments</span>
        </NavLink>
        <NavLink
          to="/dashboard/creat-blog"
          className={({ isActive }) =>
            `text-2xl px-4 py-2 block rounded ${
              isActive
                ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
                : "bg-transparent text-black dark:text-white"
            } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <FaRegEdit />
          <span>Creat Blog</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
