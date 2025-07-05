import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBlogImagePreview(reader.result);
        setBlogImage(file);
      };
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://blog-application-23z7.onrender.com/single-blog/${id}`, {
          withCredentials: true,
        });
        const data = res.data.blog;
        // console.log("Fetched data:", data);
        setTitle(data.title || "");
        setCategory(data.category || "");
        setAbout(data.about || "");
        setBlogImagePreview(data.blogImage?.url || "/imgPL.webp");
      } catch (error) {
        console.error("Fetch blog error:", error?.response?.data || error.message);
        toast.error("Failed to load blog");
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !category || !about) {
      toast.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    if (blogImage) formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.put(
        `https://blog-application-23z7.onrender.com/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog updated!");
      navigateTo("/");
    } catch (error) {
      console.error("Update error:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <section className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Category</label>
            <select
              className="w-full p-2 border rounded-md"
              value={category} // Set value to the state variable
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Books">Books</option> {/* Ensure this category matches your data */}
            </select>
          </div>

          <input
            type="text"
            placeholder="BLOG MAIN TITLE"
            className="w-full p-2 mb-4 border rounded-md"
            value={title} // Bind the input field to the state
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="mb-4">
            <label className="block mb-2 font-semibold">BLOG IMAGE</label>
            <img
              src={blogImagePreview || "/imgPL.webp"}
              alt="Blog Main"
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              accept="image/*"
              onChange={changePhotoHandler}
            />
          </div>

          <textarea
            rows="6"
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Write something about your blog (at least 200 characters)"
            value={about} // Bind the textarea field to the state
            onChange={(e) => setAbout(e.target.value)}
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            UPDATE
          </button>
        </form>
      </section>
    </div>
  );
}

export default UpdateBlog;
