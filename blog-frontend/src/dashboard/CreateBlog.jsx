import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiImage, FiTag, FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

const inputVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

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
      const { data } = await axios.post(
        "http://localhost:3001/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog post created successfully!");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog post.");
      console.error("Error creating blog:", error);
    }
  };

  return (
    <motion.div
      className="bg-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8" variants={inputVariants}>
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
            <FiEdit className="mr-2 text-blue-500" /> Create New Post
          </h2>
          <p className="text-gray-500 mt-1">Share your thoughts and ideas with the world.</p>
        </div>
        <form onSubmit={handleCreateBlog} className="space-y-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              <FiTag className="inline-block mr-1 text-gray-500" /> Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Education  </option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Politics">Politics</option>
            </select>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 inline-block mr-1 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a3 3 0 00-3-3H7.5a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3v-3m-9-3h.008v.008H7.5v-.008zm3 0h.008v.008H10.5v-.008zm3 0h.008v.008H13.5v-.008z"
                />
              </svg>
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="blogImage" className="block text-sm font-medium text-gray-700">
              <FiImage className="inline-block mr-1 text-gray-500" /> Blog Image
            </label>
            <div className="mt-1 flex items-center">
              <div className="shrink-0 mr-4 rounded-md overflow-hidden shadow-sm">
                <img
                  className="h-20 w-20 object-cover"
                  src={blogImagePreview ? blogImagePreview : "/imgPL.webp"}
                  alt="Blog Image Preview"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-medium text-gray-700">Upload a new image</label>
                <input
                  type="file"
                  id="blogImage"
                  onChange={changePhotoHandler}
                  className="mt-1 block w-full text-xs text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 inline-block mr-1 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 00-6-6v-3.75m6 7.5v3.75m-3.75-3h7.5m3-6.75h.008v.008H18v-.008zm-3 0h.008v.008H15v-.008zm-3 0h.008v.008H12v-.008zm-3 0h.008v.008H9v-.008zm-3 0h.008v.008H6v-.008z"
                />
              </svg>
              About
            </label>
            <textarea
              id="about"
              rows="5"
              placeholder="Write something about your blog"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2 -ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.769 59.769 0 0121.485 12a59.768 59.768 0 01-18.216 8.874L18 12m-6-6l2.23 9.734L13.056 6M6 18l2.23-9.734L10.944 18"
              />
            </svg>
            Publish Post
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default CreateBlog;