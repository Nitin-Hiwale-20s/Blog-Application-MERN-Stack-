import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "@/redux/blogSlice";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";

// Create Axios instance with JWT token from localStorage
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // if backend uses cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // replace with where your token is stored
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const YourBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);

  // Fetch user's blogs
  const getOwnBlogs = async () => {
    try {
      const res = await api.get("/blog/get-own-blogs");
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
      }
    } catch (error) {
      console.error(
        "Error fetching blogs:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch blogs");
    }
  };

  // Delete a blog
  const deleteBlog = async (id) => {
    try {
      const res = await api.delete(`/blog/${id}`);
      if (res.data.success) {
        const updatedBlogData = blog.filter((blogItem) => blogItem._id !== id);
        dispatch(setBlog(updatedBlogData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(
        "Error deleting blog:",
        error.response?.data || error.message
      );
      toast.error("Something went wrong while deleting the blog");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  useEffect(() => {
    getOwnBlogs();
  }, []);

  return (
    <div className="pb-10 pt-20 md:ml-[320px] h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
          <Table>
            <TableCaption>A list of your recent blogs.</TableCaption>
            <TableHeader className="overflow-x-auto">
              <TableRow>
                <TableHead className="pl-27 ">Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-x-auto ">
              {blog?.length > 0 ? (
                blog.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="flex gap-4 items-center">
                      {/* <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-20 rounded-md hidden md:block"
                      /> */}

                      <img
                        src={item.thumbnail || "/default-thumbnail.jpg"}
                        alt={item.title}
                        className="w-20 rounded-md hidden md:block"
                      />

                      <h1
                        className="hover:underline cursor-pointer"
                        onClick={() => navigate(`/blogs/${item._id}`)}
                      >
                        {item.title}
                      </h1>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <BsThreeDotsVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[180px]">
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(`/dashboard/write-blog/${item._id}`)
                            }
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => handleDelete(item._id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No blogs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default YourBlog;





