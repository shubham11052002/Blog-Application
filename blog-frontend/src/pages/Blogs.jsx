import React, { useEffect, useState } from "react";
import axios from "axios";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/all-blogs", {
          withCredentials: true,
        });
        console.log(data.blogs)
        setBlogs(data.blogs); // assuming response has a "blogs" array
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-indigo-700 mb-10 text-center">📚 All Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg duration-300"
          >
            <img
              src={blog.blogImage?.url}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">{blog.title}</h2>
              <p className="text-gray-600 mt-2 line-clamp-3">{blog.about}</p>

              <div className="mt-4 flex justify-end">
                <div className="bg-indigo-700  px-4 py-2 rounded-full transition duration-300 hover:bg-black text-white ">
                 {blog.category}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {blogs.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No blogs available yet.</p>
      )}
    </div>
  );
}

export default Blogs;
