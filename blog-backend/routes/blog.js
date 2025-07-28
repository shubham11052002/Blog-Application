const express = require("express")
const router = express.Router();
const BlogContorllers = require("../controllers/BlogControllers");
const { isAuthenticate, isAdmin, checkBlocked } = require('../middleware/authUser');
router.post("/create", isAuthenticate,checkBlocked, (req, res) => {
    BlogContorllers.createBlog(req, res);
})
router.delete("/delete/:id", isAuthenticate,checkBlocked, isAdmin("admin"), (req, res) => {
    BlogContorllers.deleteBlog(req, res);  
})
router.get("/all-blogs",(req, res) => {
    BlogContorllers.getAllBlogs(req, res);
})
router.get("/single-blog/:id", isAuthenticate,checkBlocked, (req, res) => {
    BlogContorllers.getSingleBlog(req, res);
})
router.get("/my-blogs", isAuthenticate,checkBlocked, (req, res) => {
    BlogContorllers.getMyBlogs(req, res);
})
router.get("/update/:id", isAuthenticate, checkBlocked,  (req, res) => {
    BlogContorllers.getSingleBlog(req, res);
});

router.put("/update/:id", isAuthenticate, checkBlocked, (req, res) => {
    BlogContorllers.updateBlog(req, res);
});
router.delete("/delete-all", isAuthenticate, isAdmin("admin","superadmin"), async (req, res) => {
    try {
      await BlogContorllers.deleteAllBlogs(req, res);
    } catch (error) {
      res.status(500).json({ message: "Error deleting all blogs", error });
    }
  });

module.exports = router;