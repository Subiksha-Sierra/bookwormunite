// src/components/Book/BookCard.jsx

import React from "react";
import { Book } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

/**
 * Props: {
 *   book: {
 *     title: string;
 *     author: string;
 *     isbn: string;
 *     category: string;
 *     status: 'available' | 'borrowed' | 'reserved';
 *     borrowedBy?: string;
 *     dueDate?: string;
 *   }
 * }
 */
const BookCard = ({ book }) => {
  const statusClasses = {
    available: "bg-green-100 text-green-800",
    borrowed: "bg-amber-100 text-amber-800",
    reserved: "bg-blue-100 text-blue-800",
  };

  const handleReserve = (book) => {
    console.log("Reserve clicked:", book);
    // Reserve logic here (e.g., update state or call API)
  };

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-md">
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="mr-4 h-12 w-12 flex items-center justify-center bg-blue-100 rounded-md">
              <Book size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[book.status]}`}
          >
            {book.status}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">ISBN</p>
            <p className="text-sm font-medium">{book.isbn}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Category</p>
            <p className="text-sm font-medium">{book.category}</p>
          </div>
        </div>

        {book.status === "borrowed" && (
          <div className="mt-4">
            <p className="text-xs text-gray-500">Borrowed By</p>
            <p className="text-sm font-medium">{book.borrowedBy}</p>
            <p className="text-xs text-gray-500 mt-1">Due Date</p>
            <p className="text-sm font-medium">
              {book.dueDate ? new Date(book.dueDate).toLocaleDateString() : "N/A"}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          variant="primary"
          size="sm"
          className="px-4"
          onClick={() => handleReserve(book)}
        >
          Reserve
        </Button>
      </div>
    </Card>
  );
};

export default BookCard;