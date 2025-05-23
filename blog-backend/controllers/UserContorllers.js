const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const bcrypt = require("bcrypt")
const CreateTokenSvaeCokkies = require("../jwt/AuthToken")
const saltOrRound = 10;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});

const Register = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.photo) {
            console.log("Photo is missing");
            return res.status(400).json({ success: false, message: "User photo is required" });
        }

        const { photo } = req.files;
        console.log("Photo details:", photo); // Debugging

        const allowedFormats = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        if (!allowedFormats.includes(photo.mimetype)) {
            return res.status(400).json({ success: false, message: "Invalid photo format. Only JPG, PNG, and WebP are allowed." });
        }

        const { email, name, password, phone, education, role } = req.body;
        if (!email || !name || !password || !phone || !education || !role) {
            return res.status(400).json({ success: false, message: "Please fill all required fields." });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists!" });
        }

        let cloudinaryResponse;
        try {
            cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
        } catch (uploadError) {
            console.error("Cloudinary upload error:", uploadError);
            return res.status(500).json({ success: false, message: "Cloudinary upload failed", error: uploadError.message });
        }

        const hashpassword = bcrypt.hashSync(password, saltOrRound);
        const newUser = new User({
            email,
            name,
            password: hashpassword,
            phone,
            education,
            role,
            photo: { public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.secure_url }
        });

        await newUser.save();
        const token = await CreateTokenSvaeCokkies(newUser._id, res);
        return res.status(201).json({ success: true, message: "User registered successfully", newUser, token });
    } catch (error) {
        console.error("Error in Register function:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error in Register ", error: error.message });
    }
};

const Login = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        if (!email || !password || !role) {
            return res.status(400).send({ success: false, message: "please enter required fields" })
        }
        const user = await User.findOne({ email }).select(`+password`);
        if (!user.password) {
            return res.status(400).send({ message: "user password is missing" })
        }
        const isMAtch = await bcrypt.compare(password, user.password);
        if (!isMAtch || !user) {
            return res.status(400).send({ message: "Invalid email and password" })
        }
        if (user.role != role) {
            return res.status(400).send({ message: `Given role ${role} not found` })
        }
        const token = await CreateTokenSvaeCokkies(user._id, res);
        // console.log("Loogin token ", token)
        return res.status(200).send({
            message: "User login sucessfully", user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }, token: token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ success: false, messgae: "Interanl Sever Error in Login" })
    }
}
const Logout = async (req, res) => {
    try {
        res.clearCookie("jwt", { httpOnly: true });
        res.status(200).send({ message: "User logout sucessfully" })
    } catch (error) {
        res.status(400).send({ message: "Internal Server Error in Logout" })
    }
}
const getMyProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(400).send({ message: "Internal Server Error in getMyProfile" });
    }
};

const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" });
        return res.status(200).send({ success: true, admins: admins })
    } catch (error) {
        return res.status(400).send({ message: "Internal Server Error in getAdmins" })
    }
}

const getAllUsers = async (req, res) => {
    try {
        console.log("📥 Received request to get all users.");

        const users = await User.find({ role: { $ne: 'admin' } }).select('-password');  // Exclude admins by filtering role

        console.log("📤 Found users:", users);

        if (users.length > 0) {
            return res.status(200).json({ success: true, users });
        } else {
            return res.status(404).json({ success: false, message: 'No users found' });
        }
    } catch (err) {
        console.error("❌ Error in getAllUsers:", err.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const blockUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { isBlocked } = req.body;
  
      const user = await User.findByIdAndUpdate(id, { isBlocked }, { new: true });
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json({ message: `User has been ${isBlocked ? 'blocked' : 'unblocked'}` });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };

  
module.exports = {
    Register,
    Login,
    Logout,
    getMyProfile,
    getAdmins,
    getAllUsers,
    blockUser,
}