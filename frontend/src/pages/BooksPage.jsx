
import React from "react";
import BookList from "../components/BookList";

const BooksPage = ({ books }) => {
  return (
    <div className="h-full w-full flex flex-col">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Library Management System</h1>
      <BookList books={books} />
    </div>
  );
};

export default BooksPage;