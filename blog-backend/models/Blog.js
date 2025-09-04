    const mongoose = require("mongoose")

    const blogSchema = new mongoose.Schema({
        title: { type: String, required: true },
        blogImage: { public_id: { type: String, required: true }, url: { type: String } },
        category: { type: String, required: true },
        about: { type: String, required: true, minLength: [30, "minimum 30 words required"] },
        adminName: { type: String, },
        adminPhoto: { type: String, },
        createdBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    }, { timestamps: true })
    const Blog = mongoose.model("Blog", blogSchema);
    module.exports = Blog;