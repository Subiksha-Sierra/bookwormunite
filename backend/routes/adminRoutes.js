const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/roleMiddleware");
const adminController = require("../controllers/adminController");

// Admin routes
router.post("/add-book", isAdmin, adminController.addBook);
router.post("/add-student", isAdmin, adminController.addStudent);
router.put("/return-book/:id", isAdmin, adminController.returnBook);
router.get("/borrowed-books", isAdmin, adminController.getAllBorrowedBooks);

module.exports = router;