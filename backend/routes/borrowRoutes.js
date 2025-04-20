const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");

// Borrow routes
router.post("/borrow/:bookId", borrowController.borrowBook); // To borrow a book

module.exports = router;