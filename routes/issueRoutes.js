const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createIssue,
  getIssues,
  getMyIssues,
  returnIssue
} = require("../controllers/issueController");

const router = express.Router();

router.use(authMiddleware);
router.post("/", roleMiddleware("admin"), createIssue);
router.get("/", roleMiddleware("admin"), getIssues);
router.get("/my", roleMiddleware("student"), getMyIssues);
router.put("/:id/return", roleMiddleware("admin"), returnIssue);

module.exports = router;
