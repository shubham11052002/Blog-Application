const express = require('express')
const router = express.Router();
const UserControllers = require('../controllers/UserContorllers');
const { isAuthenticate, isAdmin, checkBlocked } = require('../middleware/authUser');
router.post("/register", (req, res) => {
    UserControllers.Register(req, res);
});
router.post("/login", (req, res) => {
    UserControllers.Login(req, res);
  });   
router.get("/logout", isAuthenticate,checkBlocked, (req, res) => {
    UserControllers.Logout(req, res);
});
router.get("/my-profile", isAuthenticate, checkBlocked, (req, res) => {
    UserControllers.getMyProfile(req, res);
});
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