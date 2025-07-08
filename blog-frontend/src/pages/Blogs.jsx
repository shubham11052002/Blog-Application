import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const loader = useRef(null);
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

  useEffect(() => {
    const filtered = category
      ? blogs.filter((blog) => blog.category === category)
      : blogs;
    setFilteredBlogs(filtered);
    setVisibleCount(8);
  }, [category, blogs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 4);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-20 pb-16 min-h-screen">
      <h1 className="text-4xl font-bold text-indigo-600 mb-10 text-center">
        📝 Explore Blogs
      </h1>

      <div className="flex justify-center mb-10">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white border border-gray-300 text-sm rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          <option value="Devotion">Devotion</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Business">Business</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBlogs.slice(0, visibleCount).map((blog) => (
          <Link to={`/blogs/${blog._id}`} key={blog._id}>
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 duration-300">
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={blog.blogImage?.url}
                  alt={blog.title}
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-[2px] rounded-full shadow">
                  {blog.category}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-sm font-semibold text-gray-800 truncate">
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

      {filteredBlogs.length === 0 && (
        <p className="text-center text-gray-400 mt-10 text-base">
          No blogs available.
        </p>
      )}

      <div ref={loader} className="h-16 mt-10 flex justify-center items-center">
        {visibleCount < filteredBlogs.length && (
          <p className="text-gray-400 text-sm">Loading more...</p>
        )}
      </div>
    </div>
  );
}

export default Blogs;
