import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import BooksPage from './pages/BooksPage';
import Admin from './pages/admin';
import Layout from './layouts/Layout';
import AdminLogin from './pages/AdminLogin';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/books"
          element={
            <Layout>
              <BooksPage />
            </Layout>
          }
        />
      </Routes>
  );
};

export default App;