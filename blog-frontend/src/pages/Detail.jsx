import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/single-blog/${id}`, {
          withCredentials: true,
        });
        setBlogs(res.data.blog);
      } catch (error) {
        console.error("Fetch blog error:", error?.response?.data || error.message);
        toast.error("Failed to load blog");
      }
    };
    fetchBlog();
  }, [id]);

  if (!blogs) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading blog details...</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-4">
        <span className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
          {blogs.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mt-2 mb-6 leading-tight">
          {blogs.title}
        </h1>
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={blogs.adminPhoto}
            alt="author"
            className="w-12 h-12 rounded-full border border-gray-300"
          />
          <p className="text-gray-700 font-medium">{blogs.adminName}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img
            src={blogs.blogImage?.url}
            alt="blog"
            className="w-full h-auto rounded-lg shadow-md border"
          />
        </div>
        <div className="md:w-1/2">
          <p className="text-lg text-gray-700 leading-relaxed">
            {blogs.about}
          </p>
        </div>
      </div>

      <div className="mt-10 border-t pt-6 text-gray-500 text-sm">
      <p className="text-gray-500 text-sm">
  Posted on: {new Date(blogs?.createdAt).toLocaleString()}
</p>
      </div>
    </section>
  );
};
