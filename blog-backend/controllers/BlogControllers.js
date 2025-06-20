const Blog = require("../models/Blog");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose")
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});
const createBlog = async (req, res) => {
    try {
        if (!req.files || !req.files.blogImage) {
            console.log("No blogImage file was uploaded.");
            return res.status(400).json({ success: false, message: "Blog image is required" });
        }
        const blogImage = req.files.blogImage;
        const allowedFormats = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        if (!allowedFormats.includes(blogImage.mimetype)) {
            return res.status(400).json({ success: false, message: "Invalid photo format. Only JPG, PNG, and WebP are allowed." });
        }
        if (!req.user) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }
        const { title, category, about } = req.body;
        if (!title || !category || !about) {
            return res.status(400).json({ success: false, message: "Title, category & about are required fields." });
        }
        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo?.url;
        const createdBy = req?.user?._id;

        let cloudinaryResponse;
        try {
            if (!blogImage.tempFilePath) {
                return res.status(400).json({ success: false, message: "File path not found" });
            }
            cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
        } catch (uploadError) {
            console.error("Cloudinary Upload Error:", uploadError.message);
            return res.status(500).json({ success: false, message: "Cloudinary upload failed", error: uploadError.message });
        }

        const blogData = {
            title,
            adminName,
            adminPhoto,
            createdBy,
            about,
            category,
            blogImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            }
        };
        const blog = await Blog.create(blogData);
        res.status(201).json({ success: true, message: "Blog created successfully", blog });
    } catch (error) {
        console.error("Error in createBlog function:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id)
        if (!blog) {
            res.status(400).send({ message: "blog not found" })
        }
        return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found" });
        }
        return res.status(200).send({ blogs });
    } catch (error) {
        console.error("Error getting blogs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "invalid blog Id" })
        }
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(400).send({ success: false, message: "blog not found" })
        }
        return res.status(200).send({ success: true, blog })
    } catch (error) {
        console.log("error in getting single blog ", error)
        return res.status(400).json({ message: "Internal server error" });
    }
}
const getMyBlogs = async (req, res) => {
    try {
        const createdBy = req.user._id;
        const myBlog = await Blog.find({ createdBy });
        if (!myBlog || myBlog.length === 0) {
            return res.status(404).json({ success: false, message: "No blogs found" });
        }
        return res.status(200).json({ success: true, myBlog });
    } catch (error) {
        console.error("Error in fetching user's blogs:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid blog ID" });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json({ message: "Blog updated successfully", updatedBlog });
    } catch (error) {
        console.error("Error updating blog:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const deleteAllBlogs = async (req, res) => {
    try {
        await Blog.deleteMany({});
        res.status(200).json({ message: "All blogs deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blogs", error });
    }
};

module.exports = {
    createBlog,
    deleteBlog,
    getAllBlogs,
    getSingleBlog,
    getMyBlogs,
    updateBlog,
    deleteAllBlogs,
}