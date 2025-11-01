import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBlog } from "@/redux/blogSlice";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blog } = useSelector((store) => store.blog);

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createBlogHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/blog/`,
        
        { title, category },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setBlog([...blog, res.data.blog]));
        navigate(`/dashboard/write-blog/${res.data.blog._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 md:pr-20 h-screen md:ml-[320px] pt-20">
      <Card className="md:p-10 p-4 dark:bg-gray-800">
        <h1 className="text-xl font-bold">Let's Create Blog</h1>
        <p className="text-gray-500">
          Write your blog title and select a category to get started.
        </p>

        <div className="mt-5">
          {/* Title Input */}
          <div>
            <Label className="mb-2">Title</Label>
            <Input
              type="text"
              placeholder="Your Blog Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category Select */}
          <div className="mt-4 mb-5">
            <Label className="mb-2">Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button onClick={createBlogHandler}>Create</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateBlog;





