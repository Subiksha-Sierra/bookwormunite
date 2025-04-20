const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");
const authMiddleware = require("../middlewares/authMiddleware");

// Student: View borrow history
router.get("/student/borrows", authMiddleware(["student"]), borrowController.getStudentBorrows);

// Admin: Get all currently borrowed books
router.get("/admin/borrows", authMiddleware(["admin"]), borrowController.getAllActiveBorrows);

// Admin: Mark a book as returned
router.put("/admin/borrows/:borrowId/return", authMiddleware(["admin"]), borrowController.markAsReturned);

module.exports = router;