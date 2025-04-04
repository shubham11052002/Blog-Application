const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    blogImage: { public_id: { type: String, required: true }, url: { type: String } },
    category: { type: String, required: true },
    about: { type: String, required: true, minLength: [10, "minimum length is 10 words"] },
    adminName: { type: String, },
    adminPhoto: { type: String, },
    createdAt: Date,
    updatedAt: Date,
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User" },
})
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;