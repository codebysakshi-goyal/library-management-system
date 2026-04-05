const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  registerStudent,
  loginUser,
  getCurrentUser
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
