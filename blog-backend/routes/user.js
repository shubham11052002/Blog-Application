const express = require('express')
const router = express.Router();
const UserControllers = require('../controllers/UserContorllers');
const { isAuthenticate, isAdmin } = require('../middleware/authUser');
const checkBlocked = require("../middlewares/checkBlocked");

router.post("/register", (req, res) => {
    UserControllers.Register(req, res);
});
router.post("/login",checkBlocked, (req, res) => {
    UserControllers.Login(req, res);
});
router.get("/logout", isAuthenticate, (req, res) => {
    UserControllers.Logout(res, res);
});
router.get("/my-profile", isAuthenticate, (req, res) => {
    UserControllers.getMyProfile(req, res);
})
router.get("/admins", (req, res) => {
    UserControllers.getAdmins(req, res);
})
router.get("/users", isAuthenticate, isAdmin("admin"), (req, res) => {
    UserControllers.getAllUsers(req, res);
})
router.put("/block/:id", isAuthenticate, isAdmin("admin"), (req, res) => {
    UserControllers.blockUser(req, res);
})
module.exports = router;