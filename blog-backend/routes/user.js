const express = require('express')
const router = express.Router();
const UserControllers = require('../controllers/UserContorllers');
const { isAuthenticate } = require('../middleware/authUser');

router.post("/register", (req, res) => {
    UserControllers.Register(req, res);
});
router.post("/login", (req, res) => {
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
module.exports = router;