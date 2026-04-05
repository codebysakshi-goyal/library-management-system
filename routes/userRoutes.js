const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  getStudents,
  getStudentById,
  updateProfile,
  deleteStudent
} = require("../controllers/userController");

const router = express.Router();

router.use(authMiddleware);
router.get("/students", roleMiddleware("admin"), getStudents);
router.get("/students/:id", roleMiddleware("admin"), getStudentById);
router.put("/profile", roleMiddleware("student"), updateProfile);
router.delete("/students/:id", roleMiddleware("admin"), deleteStudent);

module.exports = router;
