import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/all-blogs`, {
          withCredentials: true,
        });
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [baseURL]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-[72px]">
      <h1 className="text-4xl font-bold text-indigo-700 mb-10 text-center">
        📝 Explore Blogs
      </h1>

      <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-6">
        {blogs.map((blog, index) => (
          <Link to={`/blogs/${blog._id}`} key={blog._id} className="block">
            <div
              className="break-inside-avoid bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 hover:border-black transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={blog.blogImage?.url}
                  alt={blog.title}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                  {blog.category}
                </div>
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-4">
                  {blog.about}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {blogs.length === 0 && (
        <p className="text-center text-gray-400 mt-10 text-lg">
          No blogs available yet.
        </p>
      )}
    </div>
  );
}

export default Blogs;
