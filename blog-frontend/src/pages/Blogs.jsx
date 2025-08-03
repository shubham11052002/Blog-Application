import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f1c] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1c] text-white mt-10">
      <header className="bg-[#161627] py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Explore Blogs
          </h1>
          <p className="text-gray-400">Discover amazing content from our community</p>
          <p>Here are a Total no. of <b>{blogs.length} Blogs </b> from our Creators </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sticky top-0 z-10 bg-[#0f0f1c]/80 backdrop-blur-sm">
        <div className="flex flex-wrap gap-4">
          
          <div className="flex flex-wrap gap-3 mb-4">
  {["All", "Devotion", "Sports", "Education", "Entertainment", "Business"].map((cat) => (
    <button
      key={cat}
      onClick={() => setCategory(cat === "All" ? "" : cat)}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${
        category === cat || (cat === "All" && category === "")
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow"
          : "bg-[#1e1e2e] text-gray-300 border-gray-600 hover:bg-[#2a2a3a]"
      }`}
    >
      {cat}
    </button>
  ))}
</div>

<span className="block mb-6 text-gray-400">
  {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? "s" : ""} found in{" "}
  <span className="font-semibold text-white">
    {(category || "All").charAt(0).toUpperCase() + (category || "All").slice(1)}
  </span>
</span>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
          {filteredBlogs.slice(0, visibleCount).map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 break-inside-avoid"
            >
              <Link to={`/blogs/${blog._id}`}>
                <div className="bg-[#1e1e2e] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#2a2a3a]">
                  <div className="relative">
                    <img
                      src={blog.blogImage?.url}
                      alt={blog.title}
                      className="w-full h-auto object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{blog.about}</p>
                    <div className="mt-4 flex items-center text-xs text-gray-500">
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No blogs available in this category.</p>
          </div>
        )}

        <div ref={loader} className="h-16 flex justify-center items-center">
          {visibleCount < filteredBlogs.length && (
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;