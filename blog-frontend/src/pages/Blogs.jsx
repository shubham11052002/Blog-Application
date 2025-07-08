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
    <div className="max-w-7xl mt-8 mx-auto px-3 py-12">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        📝 Explore Blogs
      </h1>

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-4">
        {blogs.map((blog, index) => (
          <Link to={`/blogs/${blog._id}`} key={blog._id} className="block">
            <div
              className="break-inside-avoid bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-200 hover:border-black transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={blog.blogImage?.url}
                  alt={blog.title}
                  className="w-full h-32 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-[2px] rounded-full shadow">
                  {blog.category}
                </div>
              </div>

              <div className="p-2">
                <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">
                  {blog.title}
                </h2>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {blog.about}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {blogs.length === 0 && (
        <p className="text-center text-gray-400 mt-8 text-sm">
          No blogs available yet.
        </p>
      )}
    </div>
  );
}

export default Blogs;
