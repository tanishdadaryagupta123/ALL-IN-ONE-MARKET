const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Import User model

const protect = asyncHandler(async (req, res, next) => {
    let token;

   // Extract token from cookies or Authorization header
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401);
        return res.json({ message: "Not authorized, no token" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by decoded token ID, excluding password
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            res.status(401);
            return res.json({ message: "Not authorized, user not found" });
        }

        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
});

module.exports = { protect };
