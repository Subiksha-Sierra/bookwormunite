const Student = require("../models/Student");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const { sendVerificationMail } = require("../services/emailService");
const BorrowRequest = require("../models/BorrowRequest");
const Book = require("../models/Book");

require("dotenv").config();

// Generate JWT Token
const generateToken = (user, role) => {
  return jwt.sign(
    {
      id: user._id,
      role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Student Login
const loginStudent = async (req, res) => {
  try {
    const { username, password } = req.body;
    const student = await Student.findOne({ username });

    if (!student) return res.status(404).json({ message: "Student not found" });

    // Directly compare the password without bcrypt
    if (password !== student.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(student, "student");

    const { password: _, ...studentInfo } = student.toObject();

    res.status(200).json({ token, student: studentInfo });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Directly compare the password without bcrypt
    if (password !== admin.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin, "admin");

    // Strip password before sending
    const { password: _, ...adminInfo } = admin.toObject();

    res.status(200).json({ token, admin: adminInfo });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Student tries to borrow a book -> send email for verification
const initiateBorrowRequest = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book || !book.isAvailable)
      return res.status(400).json({ message: "Book not available" });

    // Create borrow request (status: pending)
    const borrowRequest = new BorrowRequest({
      studentId,
      bookId,
      status: "pending",
    });
    await borrowRequest.save();

    // Fetch email from DB
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Send verification mail
    await sendVerificationMail(student.email, borrowRequest._id);

    res.status(200).json({ message: "Verification email sent. Please check your inbox." });
  } catch (error) {
    res.status(500).json({ message: "Failed to initiate borrow request", error: error.message });
  }
};

// Student clicks email -> confirm borrow
const confirmBorrow = async (req, res) => {
  try {
    const { requestId } = req.params;

    const borrowRequest = await BorrowRequest.findById(requestId);
    if (!borrowRequest || borrowRequest.status !== "pending")
      return res.status(404).json({ message: "Invalid or expired borrow request" });

    // Update borrow status
    borrowRequest.status = "confirmed";
    await borrowRequest.save();

    // Make book unavailable
    const book = await Book.findById(borrowRequest.bookId);
    book.isAvailable = false;
    await book.save();

    res.status(200).json({ message: "Borrow request confirmed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to confirm borrow", error: error.message });
  }
};

module.exports = {
  loginStudent,
  loginAdmin,
  initiateBorrowRequest,
  confirmBorrow,
};