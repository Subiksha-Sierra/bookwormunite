import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import BookList from './pages/BookList';
import Admin from './pages/admin';
//import ReservePage from './pages/ReservePage';
import AdminLogin from './pages/AdminLogin';



function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/admin" element={<Admin />} />
        
        <Route path="/admin-login" element={<AdminLogin />} />

      </Routes>
      
  );
}

export default App;