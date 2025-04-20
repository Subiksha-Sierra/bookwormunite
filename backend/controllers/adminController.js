const Student = require("../models/Student");
const Book = require("../models/Book");
const BorrowRequest = require("../models/BorrowRequest");

// 1. Add a new book
const addBook = async (req, res) => {
  try {
    const { title, author } = req.body;

    const newBook = new Book({ title, author, isAvailable: true });
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Failed to add book", error: error.message });
  }
};

// 2. Add a new student
const addStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: "Student already exists" });

    const newStudent = new Student({ name, email, password }); // Hash password in model/middleware
    await newStudent.save();

    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Failed to add student", error: error.message });
  }
};

// 3. View all borrowed books (pending return)
const getBorrowedBooks = async (req, res) => {
  try {
    const borrowed = await BorrowRequest.find({ status: "confirmed" })
      .populate("studentId", "name email")
      .populate("bookId", "title author");

    res.status(200).json(borrowed);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch borrowed books", error: error.message });
  }
};

// 4. Mark book as returned
const returnBook = async (req, res) => {
  try {
    const { id } = req.params; // Correct parameter name

    const borrowRequest = await BorrowRequest.findById(id);
    if (!borrowRequest || borrowRequest.status !== "confirmed") {
      return res.status(404).json({ message: "Borrow request not found or already returned" });
    }

    // Mark request as returned
    borrowRequest.status = "returned";
    await borrowRequest.save();

    // Make book available again
    const book = await Book.findById(borrowRequest.bookId);
    book.isAvailable = true;
    await book.save();

    res.status(200).json({ message: "Book marked as returned" });
  } catch (error) {
    res.status(500).json({ message: "Failed to return book", error: error.message });
  }
};

module.exports = {
  addBook,
  addStudent,
  getBorrowedBooks,
  returnBook,
};