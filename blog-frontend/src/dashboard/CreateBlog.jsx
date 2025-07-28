import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiUpload, FiEdit2, FiType, FiAlignLeft, FiInfo } from "react-icons/fi";
import { motion } from "framer-motion";

function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    about: "",
    blogImage: null,
    blogImagePreview: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData({
        ...formData,
        blogImage: file,
        blogImagePreview: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { title, category, about, blogImage } = formData;
    if (!title || !category || !about || !blogImage) {
      toast.error("Please fill all fields");
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("category", category);
    formDataToSend.append("about", about);
    formDataToSend.append("blogImage", blogImage);

    try {
      const { data } = await axios.post(`${baseURL}/create`, formDataToSend, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      toast.success(data.message || "Blog published successfully");
      setFormData({
        title: "",
        category: "",
        about: "",
        blogImage: null,
        blogImagePreview: ""
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to publish blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1c] text-white pt-8 pb-8 px-4 sm:px-6 mt-15">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#1e1e2e] rounded-xl p-5 border border-[#2a2a3a]"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiEdit2 className="text-[#7f5af0]" />
            Create New Blog
          </h2>
          
          <form onSubmit={handleCreateBlog} className="space-y-4">
            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-md text-sm focus:ring-1 focus:ring-[#7f5af0]"
                required
              >
                <option value="">Select category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>

            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-md text-sm focus:ring-1 focus:ring-[#7f5af0]"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Featured Image</label>
              <div className="border border-[#3a3a4a] rounded-md p-2 bg-[#2a2a3a]">
                {formData.blogImagePreview ? (
                  <img
                    src={formData.blogImagePreview}
                    alt="Preview"
                    className="w-full h-28 object-cover rounded-md mb-2"
                  />
                ) : (
                  <div className="text-center py-3 text-gray-400 text-xs">
                    <FiUpload className="mx-auto text-lg mb-1" />
                    <p>Click to upload image</p>
                  </div>
                )}
                <input
                  type="file"
                  onChange={changePhotoHandler}
                  className="hidden"
                  id="image-upload"
                  accept="image/*"
                  required={!formData.blogImagePreview}
                />
                <label 
                  htmlFor="image-upload"
                  className="block text-center text-xs py-1 px-2 bg-[#3a3a4a] hover:bg-[#4a4a5a] rounded cursor-pointer transition-colors"
                >
                  Choose File
                </label>
              </div>
            </div>

            {/* About Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
              <textarea
                name="about"
                rows="4"
                placeholder="Write your content here..."
                value={formData.about}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-md text-sm focus:ring-1 focus:ring-[#7f5af0]"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md text-sm font-medium mt-2 ${
                isSubmitting
                  ? "bg-[#7f5af0]/70 cursor-not-allowed"
                  : "bg-[#7f5af0] hover:bg-[#6c4ac9]"
              }`}
            >
              {isSubmitting ? "Publishing..." : "Publish Blog"}
            </motion.button>
          </form>
        </motion.div>

        {/* Right Column - Guidelines */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#1e1e2e] rounded-xl p-5 border border-[#2a2a3a]"
        >
          <div className="flex items-center gap-2 mb-4">
            <FiInfo className="text-[#7f5af0]" />
            <h2 className="text-xl font-bold">Writing Guidelines</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#2a2a3a] rounded-md border-l-4 border-[#7f5af0]">
              <h3 className="font-medium text-white mb-1">Title Tips</h3>
              <p className="text-gray-400">Keep it under 60 characters. Use power words that grab attention.</p>
            </div>

            <div className="p-3 bg-[#2a2a3a] rounded-md border-l-4 border-[#2cb67d]">
              <h3 className="font-medium text-white mb-1">Image Requirements</h3>
              <p className="text-gray-400">Minimum 1200×630px. Use high-quality JPG or PNG. Max 5MB.</p>
            </div>

            <div className="p-3 bg-[#2a2a3a] rounded-md border-l-4 border-[#9370ff]">
              <h3 className="font-medium text-white mb-1">Content Structure</h3>
              <p className="text-gray-400">Break into short paragraphs. Use subheadings every 300 words.</p>
            </div>

            <div className="p-3 bg-[#2a2a3a] rounded-md border-l-4 border-[#ff7e5a]">
              <h3 className="font-medium text-white mb-1">SEO Best Practices</h3>
              <p className="text-gray-400">Include keywords naturally. Write meta descriptions under 160 chars.</p>
            </div>

            <div className="p-3 bg-[#2a2a3a] rounded-md border-l-4 border-[#2ca5b6]">
              <h3 className="font-medium text-white mb-1">Community Rules</h3>
              <p className="text-gray-400">No plagiarism. Be respectful. Cite sources when needed.</p>
            </div>
          </div>

          {/* Preview Section */}
          {formData.title && (
            <div className="mt-6 pt-6 border-t border-[#2a2a3a]">
              <h3 className="text-sm font-semibold mb-2 text-gray-300">LIVE PREVIEW</h3>
              <div className="bg-[#2a2a3a] rounded-md p-3">
                {formData.blogImagePreview && (
                  <img
                    src={formData.blogImagePreview}
                    alt="Preview"
                    className="w-full h-20 object-cover rounded-md mb-2"
                  />
                )}
                <h4 className="text-sm font-medium text-white line-clamp-1">{formData.title}</h4>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{formData.about}</p>
                <div className="mt-2 text-xs text-[#7f5af0]">{formData.category}</div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default CreateBlog;