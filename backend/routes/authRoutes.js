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

// Borrowing routes (student must be authenticated)
router.post("/borrow", authMiddleware(["student"]), initiateBorrowRequest);

// Email confirmation route (no auth needed, it's public via email)
router.get("/confirm/:requestId", confirmBorrow);

module.exports = router;