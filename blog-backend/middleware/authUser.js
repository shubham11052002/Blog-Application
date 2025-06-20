const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function isAuthenticate(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "User not authenticated, no user found" });
        }
        console.log("authUserToken ", token)
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
        console.log(decoded)
        if (!decoded.userId) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const user = await User.findById(decoded.userId);  // Corrected query
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in authentication:", error.message);
        return res.status(401).json({ message: "User is not authenticated", error: error.message });
    }
}

function isAdmin(...roles) {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "User role is not defined" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Access denied: Role '${req.user.role}' is not allowed` });
        }

        next();
    };
};

function checkBlocked(req, res, next) {
    if (req.user && req.user.isBlocked) {
        return res.status(403).json({ message: "You are blocked by the admin." });
    }
    next();
}

module.exports = {
    isAuthenticate,
    isAdmin,
    checkBlocked,
  };