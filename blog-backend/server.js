const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const user = require('./routes/user');
const blog = require('./routes/blog');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2; // Ensure proper import
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
// console.log(MONGO_URI);

// Middleware
app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: "/tmp/"
    }
));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MongoDB using async/await
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1); // Stop the server if DB connection fails
    }
}
connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});

app.use(user);
app.use(blog);

// ✅ Root Route
app.get('/', (req, res) => {
    res.send("<h1>Hello World...</h1>");
});

// ✅ Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
