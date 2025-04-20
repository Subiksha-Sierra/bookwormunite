const express = require("express");
const router = express.Router();
const { allowRoles } = require("../middlewares/roleMiddleware");
const adminController = require("../controllers/adminController");

// Admin routes
router.post("/add-book", allowRoles, adminController.addBook);
router.post("/add-student", allowRoles, adminController.addStudent);
router.put("/return-book/:id", allowRoles, adminController.returnBook);
router.get("/borrowed-books", allowRoles , adminController.getBorrowedBooks);

module.exports = router;