import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import JoditEditor from "jodit-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { setLoading } from "@/redux/authSlice";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

function UpdateBlog() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const { blogId: id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    thumbnail: null,
    isPublished: false,
  });

  const [previewThumbnail, setPreviewThumbnail] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        setInitialLoading(true);
        const res = await api.get(`/blog/${id}`);
        const fetchedBlog = res.data.data;

        if (fetchedBlog) {
          setBlogData({
            title: fetchedBlog.title || "",
            subtitle: fetchedBlog.subtitle || "",
            description: fetchedBlog.description || "",
            category: fetchedBlog.category || "",
            isPublished: fetchedBlog.isPublished,
            thumbnail: null,
          });
          setPreviewThumbnail(fetchedBlog.thumbnail);
        } else {
          toast.error("Blog not found.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to fetch blog data.");
        navigate("/");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (newContent) => {
    setBlogData((prev) => ({
      ...prev,
      description: newContent,
    }));
  };

  const handleCategoryChange = (value) => {
    setBlogData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  // File validation & preview
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed!");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB!");
        return;
      }
      setBlogData((prev) => ({
        ...prev,
        thumbnail: file,
      }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

   // Update blog
  const updateBlogHandle = async () => {
  // Ensure we have a blog ID
  if (!id) {
    toast.error("Invalid blog ID.");
    return;
  }

  // Basic validation
  if (!blogData.title || !blogData.description || !blogData.category) {
    toast.error("Title, description, and category are required!");
    return;
  }

  // Prepare form data
  const formData = new FormData();
  formData.append("title", blogData.title);
  formData.append("subtitle", blogData.subtitle);
  formData.append("description", blogData.description);
  formData.append("category", blogData.category);

  // Optional: add current date
  const currentDate = new Date().toISOString();
  formData.append("updatedAt", currentDate);

  if (blogData.thumbnail) {
    formData.append("file", blogData.thumbnail);
  }

  try {
    dispatch(setLoading(true));
    const res = await api.put(`/blog/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.success) {
      toast.success(res.data.message);
      navigate(`/blog/${id}`);
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    toast.error(error.response?.data?.message || "Failed to update blog.");
  } finally {
    dispatch(setLoading(false));
  }
};

  const togglePublishUnpublish = async () => {
  if (!id) {
    toast.error("Invalid blog ID.");
    return;
  }

  try {
    dispatch(setLoading(true));
    const newPublishStatus = !blogData.isPublished;

    const res = await api.patch(`/blog/${id}/publish`, {
      isPublished: newPublishStatus,
    });

    if (res.data.success) {
      setBlogData((prev) => ({ ...prev, isPublished: newPublishStatus }));
      toast.success(res.data.message);
    } else {
      toast.error("Failed to update publish status.");
    }
  } catch (error) {
    console.error("Error toggling publish status:", error);
    toast.error(error.response?.data?.message || "Failed to update blog.");
  } finally {
    dispatch(setLoading(false));
  }
};


const deleteBlog = async () => {
  if (!window.confirm("Are you sure you want to delete this blog?")) return;

  try {
    const res = await api.delete(`/blog/delete/${id}`);

    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/dashboard/your-blogs");
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};



  return (
    <div className="md:ml-[320px] pt-20 px-3 pb-10">
      <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-5">
        <h1 className="text-4xl font-bold">Update Blog</h1>
        <p>Make changes to your blog here. Click save when you are done.</p>

        {/* Publish / Delete */}
        <div className="flex gap-2">
          <Button onClick={togglePublishUnpublish} disabled={loading}>
            {loading
              ? "Please wait..."
              : blogData?.isPublished
              ? "UnPublish"
              : "Publish"}
          </Button>

          <Button
            onClick={deleteBlog}
            variant="destructive"
            disabled={loading}
          >
            Remove Blog
          </Button>
        </div>

        {/* Title */}
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Enter a Title"
            name="title"
            value={blogData.title}
            onChange={handleInputChange}
            className="dark:border-gray-300"
          />
        </div>

        {/* Subtitle */}
        <div>
          <Label>Subtitle</Label>
          <Input
            type="text"
            placeholder="Enter a subtitle"
            name="subtitle"
            value={blogData.subtitle}
            onChange={handleInputChange}
            className="dark:border-gray-300"
          />
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <JoditEditor
            ref={editor}
            value={blogData.description}
            tabIndex={1}
            onChange={handleDescriptionChange}
            config={{ readonly: false, height: 400 }}
          />
        </div>

        {/* Category */}
        <div className="mt-4 mb-5">
          <Label>Category</Label>
          <Select onValueChange={handleCategoryChange} value={blogData.category}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Digital Marketing">
                  Digital Marketing
                </SelectItem>
                <SelectItem value="Blogging">Blogging</SelectItem>
                <SelectItem value="Photography">Photography</SelectItem>
                <SelectItem value="Cooking">Cooking</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Thumbnail */}
        <div>
          <Label>Thumbnail</Label>
          <Input
            type="file"
            id="file"
            name="thumbnail"
            accept="image/*"
            className="w-fit dark:border-gray-300"
            onChange={handleFileChange}
          />
          {previewThumbnail && (
            <div className="mt-4">
              <p className="font-medium">Current Thumbnail:</p>
              <img
                src={previewThumbnail}
                alt="Thumbnail Preview"
                className="w-48 h-auto object-cover rounded-md mt-2"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button onClick={updateBlogHandle} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default UpdateBlog;






