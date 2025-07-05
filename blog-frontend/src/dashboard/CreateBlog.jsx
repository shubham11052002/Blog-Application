import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.post(`${baseURL}/create`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(data.message || "Blog created successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog");
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e2e] text-white pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto p-8 bg-[#2c2c3b] rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center border-b border-gray-600 pb-4">📝 Create Blog</h2>

        <form onSubmit={handleCreateBlog} className="space-y-6">
          <div>
            <label className="block mb-2 text-lg">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-[#1e1e2e] border border-gray-500 rounded-md focus:ring focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-lg">Title</label>
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-[#1e1e2e] border border-gray-500 rounded-md focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg">Blog Image</label>
            <div className="flex items-center justify-center mb-4">
              <img
                src={blogImagePreview ? blogImagePreview : "/imgPL.webp"}
                alt="Preview"
                className="w-full max-w-md h-56 rounded-md object-cover border-2 border-blue-500"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-4 py-2 bg-[#1e1e2e] text-gray-200 border border-gray-500 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg">About</label>
            <textarea
              rows="5"
              placeholder="Write about your blog..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-2 bg-[#1e1e2e] border border-gray-500 rounded-md focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-md transition duration-300"
          >
            🚀 Post Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
