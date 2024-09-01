// userRoutes.js
const express = require("express");
const { registerUser, loginUser, logoutUser, getUserDetails, getLoginStatus, updateUser, updatePhoto } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/getLoginStatus", protect, getLoginStatus);
router.get("/logout", logoutUser);
router.get("/getUser", getUserDetails);

router.patch("/updateUser", protect, updateUser);
router.patch("/updatePhoto", protect, updatePhoto);

module.exports = router;
