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
    <div
      className="min-h-screen pt-[72px] px-4 py-12"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <h1 className="text-4xl font-bold text-indigo-700 mb-10 text-center">
          📝 Explore Blogs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog, index) => (
            <Link to={`/blogs/${blog._id}`} key={blog._id} className="block">
              <div
                className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative rounded-t-2xl overflow-hidden">
                  <img
                    src={blog.blogImage?.url || "https://via.placeholder.com/400x250?text=No+Image"}
                    alt={blog.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                    {blog.category}
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                    {blog.about}
                  </p>

                  <div className="flex items-center gap-2 mt-4">
                    <img
                      src={blog.adminPhoto || "https://via.placeholder.com/32"}
                      alt={blog.adminName}
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      {blog.adminName}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {blogs.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No blogs available yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Blogs;
