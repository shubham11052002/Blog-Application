const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    phone: { type: Number, required: true },
    photo: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    education: { type: String },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "superadmin"],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", userSchema);
module.exports = Users;
