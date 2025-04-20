const mongoose = require("mongoose");

const borrowRequestSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "returned"],
    default: "pending",
  },
  verificationToken: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const BorrowRequest = mongoose.model("BorrowRequest", borrowRequestSchema);
module.exports = BorrowRequest;