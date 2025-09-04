const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const user = require('./routes/user');
const blog = require('./routes/blog');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2; 
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: "/tmp/"
    }
));
const allowedOrigins = [
    "https://blog-application-zdq6.vercel.app",
    "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
        callback(null, true);
      } else {
        console.error("CORS error: Blocked origin →", origin);
        callback(new Error("CORS error: Not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1); 
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
app.get('/', (req, res) => {
    res.send("<h1>Hello World...</h1>");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
