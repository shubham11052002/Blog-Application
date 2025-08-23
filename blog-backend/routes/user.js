const express = require('express')
const User = require("../models/User");
const router = express.Router();
const UserControllers = require('../controllers/UserContorllers');
const { isAuthenticate, isAdmin, checkBlocked } = require('../middleware/authUser');
router.post("/register", (req, res) => {
    UserControllers.Register(req, res);
});
router.post("/login", (req, res) => {
    UserControllers.Login(req, res);
});
router.get("/logout", isAuthenticate, checkBlocked, (req, res) => {
    UserControllers.Logout(req, res);
});
router.get("/my-profile", isAuthenticate, checkBlocked, (req, res) => {
    UserControllers.getMyProfile(req, res);
});
router.get("/creator/:id", (req, res) => {
    UserControllers.getSingleCreator(req, res);
});
router.get("/admins", (req, res) => {
    UserControllers.getAdmins(req, res);
})
router.get("/users", isAuthenticate, isAdmin("admin", "superadmin"), (req, res) => {
    UserControllers.getAllUsers(req, res);
})
router.put("/block/:id", isAuthenticate, isAdmin("admin", "superadmin"), (req, res) => {
    UserControllers.blockUser(req, res);
})
router.get("/users-stats", async (req, res) => {
    try {
        const users = await User.find();
        const activeReaders = users.filter(u => u.role === "user").length;
        // console.log(activeReaders, "ativereader")
        const featuredWriters = users.filter(u => u.role === "admin").length;
        res.json({ activeReaders, featuredWriters });
    } catch (err) {
        res.status(500).json({ message: "Error fetching stats" });
    }
});
module.exports = router;