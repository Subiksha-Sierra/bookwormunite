const express = require("express");
const router = express.Router();

const {
  loginStudent,
  loginAdmin,
  initiateBorrowRequest,
  confirmBorrow,
} = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

// Login routes
router.post("/student/login", loginStudent);
router.post("/admin/login", loginAdmin);

// Borrowing route — only accessible by students
router.post("/borrow", authMiddleware(["student"]), initiateBorrowRequest);

// Email confirmation route (no auth needed)
router.get("/confirm/:requestId", confirmBorrow);

module.exports = router;