// src/components/Book/BookList.jsx

import React, { useState } from "react";
import { Filter, Search, BookOpen } from "lucide-react";
import BookCard from "./bookCard";

/**
 * Props: {
 *   books: Book[];
 * }
 */
const BookList = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || book.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Books Management</h2>
          <p className="text-gray-500">Manage your library's book inventory</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 items-center">
          <Filter size={18} className="text-gray-500" />
          <select
            className="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
      </div>

      {/* Book List */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen size={64} className="mx-auto text-gray-300" />
          <h3 className="mt-2 text-xl font-medium text-gray-900">No books found</h3>
          <p className="mt-1 text-gray-500">
            {books.length === 0
              ? "Your library is empty. Add your first book to get started!"
              : "No books match your search criteria. Try a different search term or filter."}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookList;