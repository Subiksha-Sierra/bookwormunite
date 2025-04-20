const Book = require("../models/Book");

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error: error.message });
  }
};

// Get only available books
const getAvailableBooks = async (req, res) => {
  try {
    const books = await Book.find({ isAvailable: true });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch available books", error: error.message });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch book", error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getAvailableBooks,
  getBookById,
};