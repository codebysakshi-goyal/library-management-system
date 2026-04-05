const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

const router = express.Router();

router.use(authMiddleware);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", roleMiddleware("admin"), addBook);
router.put("/:id", roleMiddleware("admin"), updateBook);
router.delete("/:id", roleMiddleware("admin"), deleteBook);

module.exports = router;
