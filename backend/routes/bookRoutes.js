const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Book routes
router.get("/", bookController.getAllBooks); // Get all available books
router.get("/:id", bookController.getBookById); 

module.exports = router;