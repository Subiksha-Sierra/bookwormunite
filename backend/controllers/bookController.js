const Book = require("../models/bookModel");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author, isbn } = req.body;
    const book = new Book({ title, author, isbn });

    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error adding book" });
  }
};

const deleteBook = async (req, res) =>{
    try{
        const { isbn } = req.body;

    }
}

module.exports = { getAllBooks, addBook };
