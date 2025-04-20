const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Book routes
router.get("/getBook", bookController.getAllBooks);

module.exports = router;