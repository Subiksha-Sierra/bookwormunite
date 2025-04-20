import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// Initial data
const initialBooks = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", edition: "1st" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", edition: "2nd" },
  { title: "1984", author: "George Orwell", edition: "3rd" }
];

const initialStudents = [
  { name: "Alice", rollNo: "CSE101", email: "alice@college.edu" },
  { name: "Bob", rollNo: "ECE102", email: "bob@college.edu" }
];

const historyData = [
  { name: "Alice", rollNo: "CSE101", book: "1984" },
  { name: "Bob", rollNo: "ECE102", book: "To Kill a Mockingbird" }
];

// Sidebar component
const Sidebar = ({ onMenuClick }) => (
  <div className="w-64 bg-white shadow-md h-screen p-6 space-y-6">
    <h2 className="text-2xl font-bold text-blue-700 mb-6"> Library Menu</h2>
    <button onClick={() => onMenuClick("books")} className="block w-full text-black text-gray-800  font-medium">Book List</button>
    <button onClick={() => onMenuClick("students")} className="block w-full text-black text-gray-800  font-medium">Student List</button>
    <button onClick={() => onMenuClick("history")} className="block w-full text-black text-gray-800 font-medium">History</button>
  </div>
);

// BookList component
const BookList = () => {
  const [bookList, setBookList] = useState(initialBooks);
  const [editIndex, setEditIndex] = useState(null);
  const [newBook, setNewBook] = useState({ title: '', author: '', edition: '' });

  const handleDelete = index => {
    const updated = [...bookList];
    updated.splice(index, 1);
    setBookList(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewBook(bookList[index]);
  };

  const handleUpdate = () => {
    const updated = [...bookList];
    updated[editIndex] = newBook;
    setBookList(updated);
    setEditIndex(null);
    setNewBook({ title: '', author: '', edition: '' });
  };

  const handleAddBook = () => {
    if (newBook.title && newBook.author && newBook.edition) {
      setBookList([...bookList, newBook]);
      setNewBook({ title: '', author: '', edition: '' });
    }
  };

  return (
    <div className="h-full bg-white p-6 shadow rounded-lg overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Book List</h2>
        <button onClick={handleAddBook} className="bg-blue-500  text-white px-4 py-2 rounded">Add Book</button>
      </div>
      <div className="flex gap-2 mb-4">
        <input className="border p-2 rounded w-1/3" placeholder="Title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
        <input className="border p-2 rounded w-1/3" placeholder="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
        <input className="border p-2 rounded w-1/3" placeholder="Edition" value={newBook.edition} onChange={(e) => setNewBook({ ...newBook, edition: e.target.value })} />

      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Author</th>
            <th className="p-2 text-left">Edition</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2">{book.title}</td>
              <td className="p-2">{book.author}</td>
              <td className="p-2">{book.edition}</td>
              <td className="p-2 space-x-6">
                <button onClick={() => handleEdit(index)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(index)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// StudentList component
const StudentList = () => {
  const [studentList, setStudentList] = useState(initialStudents);
  const [newStudent, setNewStudent] = useState({ name: '', rollNo: '', email: '' });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.rollNo && newStudent.email) {
      setStudentList([...studentList, newStudent]);
      setNewStudent({ name: '', rollNo: '', email: '' });
    }
  };

  return (
    <div className="h-full bg-white p-6 shadow rounded-lg overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Student List</h2>
        <button onClick={handleAddStudent} className="bg-blue-500 text-white px-4 py-2 rounded">Add Student</button>
      </div>
      <div className="flex gap-2 mb-4">
        <input className="border p-2 rounded w-1/3" placeholder="Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
        <input className="border p-2 rounded w-1/3" placeholder="Roll No" value={newStudent.rollNo} onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })} />
        <input className="border p-2 rounded w-1/3" placeholder="Email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Roll No</th>
            <th className="p-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((s, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.rollNo}</td>
              <td className="p-2">{s.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// History component
const History = () => (
  <div className="h-full bg-white p-6 shadow rounded-lg overflow-auto">
    <h2 className="text-2xl font-bold mb-4">History</h2>
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100 text-black">
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Roll No</th>
          <th className="p-2 text-left">Book</th>
          <th className="p-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {historyData.map((entry, index) => (
          <tr key={index} className="border-b hover:bg-gray-50">
            <td className="p-2">{entry.name}</td>
            <td className="p-2">{entry.rollNo}</td>
            <td className="p-2">{entry.book}</td>
            <td className="p-2">
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Return Book</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Main App component
const App = () => {
  const [view, setView] = useState("books");

  const renderView = () => {
    switch (view) {
      case "books":
        return <BookList />;
      case "students":
        return <StudentList />;
      case "history":
        return <History />;
      default:
        return <BookList />;
    }
  };

  return (
    <div className="h-screen w-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar onMenuClick={setView} />

      {/* Main content */}
      <div className="flex flex-col flex-grow">
        <div className="p-6 bg-white shadow-md">
          <h1 className="text-3xl font-bold text-gray-800"> Admin Dashboard</h1>
        </div>
        <div className="flex-grow overflow-auto p-6">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default App;
