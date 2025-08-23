import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;
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
    const filtered = category ? blogs.filter((b) => b.category === category) : blogs;
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [category, blogs]);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const start = (currentPage - 1) * blogsPerPage;
  const end = start + blogsPerPage;
  const pageBlogs = filteredBlogs.slice(start, end);

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
          <p>Here are a Total no. of <b>{blogs.length} Blogs</b> from our Creators</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
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

      <div className="max-w-7xl mx-auto px-4 pb-10">
      <div className="sm:hidden grid grid-cols-4 gap-3">
  {pageBlogs.map((blog) => (
    <Link key={blog._id} to={`/blogs/${blog._id}`}>
      <div className="bg-[#1e1e2e] rounded-lg overflow-hidden border border-[#2a2a3a] hover:-translate-y-0.5 hover:shadow-lg transition">
        <img
          src={blog.blogImage?.url}
          alt={blog.title}
          className="w-full h-24 object-cover"
        />
        <div className="p-2">
          <h3 className="font-semibold text-xs leading-tight line-clamp-2">
            {blog.title}
          </h3>
        </div>
      </div>
    </Link>
  ))}
</div>


        <div className="hidden sm:block">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
            {pageBlogs.map((blog) => (
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
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No blogs available in this category.</p>
          </div>
        )}

        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-[#2a2a3a] text-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n)}
              className={`px-3 py-1 rounded ${
                currentPage === n ? "bg-purple-600 text-white" : "bg-[#2a2a3a] text-gray-300"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 rounded bg-[#2a2a3a] text-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
