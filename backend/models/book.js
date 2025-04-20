const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  description: { type: String },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;