const BorrowRequest = require("../models/BorrowRequest");
const Book = require("../models/Book");
const Student = require("../models/Student");

// Student: View your borrow history
const getStudentBorrows = async (req, res) => {
  try {
    const studentId = req.user.id;
    const borrows = await BorrowRequest.find({ studentId })
      .populate("bookId", "title author")
      .sort({ createdAt: -1 });

    res.status(200).json(borrows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch borrow history", error: error.message });
  }
};

// Admin: Get all currently borrowed books
const getAllActiveBorrows = async (req, res) => {
  try {
    const borrows = await BorrowRequest.find({ status: "confirmed" })
      .populate("studentId", "name email")
      .populate("bookId", "title");

    res.status(200).json(borrows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch active borrows", error: error.message });
  }
};

// Admin: Mark a book as returned
const markAsReturned = async (req, res) => {
  try {
    const { borrowId } = req.params;

    const borrow = await BorrowRequest.findById(borrowId);
    if (!borrow || borrow.status !== "confirmed") {
      return res.status(400).json({ message: "Invalid borrow record" });
    }

    // Update borrow status
    borrow.status = "returned";
    await borrow.save();

    // Make book available again
    const book = await Book.findById(borrow.bookId);
    book.isAvailable = true;
    await book.save();

    res.status(200).json({ message: "Book marked as returned" });
  } catch (error) {
    res.status(500).json({ message: "Failed to return book", error: error.message });
  }
};

module.exports = {
  getStudentBorrows,
  getAllActiveBorrows,
  markAsReturned,
};