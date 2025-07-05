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

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog, index) => (
          <Link to={`/blogs/${blog._id}`} key={blog._id}>
            <div
              className="relative bg-cover bg-center rounded-2xl overflow-hidden shadow-md border border-gray-300 hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1601072131080-328a5d8f7f8e?auto=format&fit=crop&w=800&q=80')`, // background image
              }}
            >
              {/* Blog Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={blog.blogImage?.url}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                  {blog.category}
                </div>
              </div>

              {/* Blog Content */}
              <div className="bg-white/90 p-4 pb-16 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {blog.about}
                </p>
              </div>

              {/* Profile Picture + Name */}
              <div className="absolute bottom-3 left-4 flex items-center gap-2 bg-white/80 px-2 py-1 rounded-full shadow">
                <img
                  src={blog.adminPhoto || "/avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
                <span className="text-sm font-medium text-gray-800">
                  {blog.adminName}
                </span>
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
