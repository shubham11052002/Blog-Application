const express = require("express")
const router = express.Router();
const BlogContorllers = require("../controllers/BlogControllers");
const { isAuthenticate, isAdmin } = require("../middleware/authUser");

router.post("/create", isAuthenticate, isAdmin("admin"), (req, res) => {
    BlogContorllers.createBlog(req, res);
})
router.delete("/delete/:id", isAuthenticate, isAdmin("admin"), (req, res) => {
    BlogContorllers.deleteBlog(req, res);  
})
router.get("/all-blogs",(req, res) => {
    BlogContorllers.getAllBlogs(req, res);
})
router.get("/single-blog/:id", isAuthenticate, (req, res) => {
    BlogContorllers.getSingleBlog(req, res);
})
router.get("/my-blogs", isAuthenticate, isAdmin("admin"), (req, res) => {
    BlogContorllers.getMyBlogs(req, res);
})
router.put("/update/:id", isAuthenticate, isAdmin("admin"), (req, res) => {
    BlogContorllers.updateBlog(req, res);
    console.log("route is working...")
})

module.exports = router;