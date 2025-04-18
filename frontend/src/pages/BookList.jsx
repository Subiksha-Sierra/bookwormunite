import React, { useState } from 'react';
import { Search } from 'lucide-react';
//import { useNavigate } from "react-router-dom";

const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    cover: "https://images.unsplash.com/photo-1581090700227-1e8a9f10c4c6?auto=format&fit=crop&q=80&w=400",
    category: "Software Engineering",
    edition: "1st Edition",
    description: "A handbook of agile software craftsmanship with practical examples and principles for writing clean code."
  },
  {
    id: 2,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    cover: "https://images.unsplash.com/photo-1616618742954-6e709dfe9265?auto=format&fit=crop&q=80&w=400",
    category: "Algorithms",
    edition: "3rd Edition",
    description: "Comprehensive guide to modern algorithms and data structures, widely used in CS curriculums."
  },
  {
    id: 3,
    title: "Computer Networking: A Top-Down Approach",
    author: "James F. Kurose",
    cover: "https://images.unsplash.com/photo-1623050848312-16f84f3e01b9?auto=format&fit=crop&q=80&w=400",
    category: "Networking",
    edition: "7th Edition",
    description: "Explores computer networking from application layer down to physical layer with real-world examples."
  },
  {
    id: 4,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    cover: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&q=80&w=400",
    category: "Programming",
    edition: "20th Anniversary Edition",
    description: "A practical guide for modern software developers to improve code, collaboration, and career."
  },
  {
    id: 5,
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    cover: "https://images.unsplash.com/photo-1555949963-aa79dcee981e?auto=format&fit=crop&q=80&w=400",
    category: "Software Design",
    edition: "1st Edition",
    description: "The classic book that catalogs common software design patterns used in object-oriented programming."
  },
  {
    id: 6,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell & Peter Norvig",
    cover: "https://images.unsplash.com/photo-1581091012184-5c8298b4c7b8?auto=format&fit=crop&q=80&w=400",
    category: "AI & Machine Learning",
    edition: "4th Edition",
    description: "Comprehensive textbook covering AI concepts, algorithms, and applications for modern systems."
  },
  {
    id: 7,
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    cover: "https://images.unsplash.com/photo-1617957742528-bdbb5c72ce71?auto=format&fit=crop&q=80&w=400",
    category: "Databases",
    edition: "7th Edition",
    description: "Thorough introduction to database systems, covering models, SQL, and transaction management."
  },
  {
    id: 8,
    title: "You Don’t Know JS",
    author: "Kyle Simpson",
    cover: "https://images.unsplash.com/photo-1603576665042-2f07ce886f42?auto=format&fit=crop&q=80&w=400",
    category: "JavaScript",
    edition: "2nd Edition",
    description: "Deep dive into the JavaScript language, from closures to async and performance."
  },
  {
    id: 9,
    title: "Flutter for Beginners",
    author: "Alessandro Biessek",
    cover: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400",
    category: "Mobile Development",
    edition: "1st Edition",
    description: "Beginner-friendly guide to building cross-platform mobile apps using Flutter and Dart."
  },
  {
    id: 10,
    title: "Cloud Computing: Concepts, Technology & Architecture",
    author: "Thomas Erl",
    cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400",
    category: "Cloud Computing",
    edition: "1st Edition",
    description: "Clear and structured explanation of cloud computing principles, services, and architecture."
  }
];



function BookList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  //const navigate = useNavigate();

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBooks = () => {
    if (searchQuery.trim() !== '') {
      const booksSection = document.getElementById('books-section');
      if (booksSection) {
        booksSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleReserve = () => {
    if (selectedBook) {
      navigate('/reservePage', { state: { book: selectedBook } });
    }
    //alert(You have reserved "${selectedBook.title}");
    //setSelectedBook(null);
    //navigate("/reservePage", { state: { book: selectedBook } });

  };

  return (
    <div className="relative-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full flex-grow">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            /*backgroundImage: 'url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000")',*/
            backgroundImage: 'url("https://images.unsplash.com/photo-1661047300050-3b06b007469e?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Welcome to Our Library
          </h1>

          <div className="w-full max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for books or authors..."
                className="w-full px-6 py-4 rounded-full text-lg border-2 border-transparent focus:border-blue-500 outline-none shadow-lg placeholder-white placeholder-opacity-100 bg-white/20 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && scrollToBooks()}
              />
              <button
                onClick={scrollToBooks}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-yellow-400 transition-colors"
              >
                <Search size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Book Section */}
      <div id="books-section" className="container mx-auto px-4 py-12 min-h-[60vh] flex flex-col justify-center item-center">
        <h2 className="text-3xl font-bold mb-8">
          {searchQuery ? 'Search Results' : 'Featured Books'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedBook(book)}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {book.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {searchQuery && filteredBooks.length === 0 && (
          <div className="text-center text-gray-600 text-lg py-32">
            No books found matching your search.
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <img
              src={selectedBook.cover}
              alt={selectedBook.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-1">{selectedBook.title}</h2>
            <p className="text-gray-700 mb-1">by {selectedBook.author}</p>
            <p className="text-gray-600 mb-1">Edition: <span className="font-medium">{selectedBook.edition}</span></p>
            <p className="text-gray-600 mb-4">{selectedBook.description}</p>

            <div className="flex justify-end gap-4">
              <button
                onClick={handleReserve}
                className="px-4 py-2  text-black rounded-lg  transition"
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;