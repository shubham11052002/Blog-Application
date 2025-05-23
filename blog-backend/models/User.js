const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, validate: [validator.isEmail, "please enter valid email"] },
    phone: { type: Number, required: true },
    photo: { public_id: { type: String, required: true }, url: { type: String, required: true } },
    education: { type: String },
    role: { type: String, required: true, enum: ["user", "admin"] },
    isBlocked: {
        type: Boolean,
        default: false,
      },
    password: { type: "String", select: false, required: true },
    token: { type: String },
})
const Users = mongoose.model("User", userSchema)
module.exports = Users;