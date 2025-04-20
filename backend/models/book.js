const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    bookNo: { type: String, required: true, unique: true },
    isAvailable: { type: Boolean, default: true },
    borrowedPerson: { type: String, default: null }, 
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;