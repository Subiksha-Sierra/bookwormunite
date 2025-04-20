import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import BooksPage from './pages/BooksPage';
import Admin from './pages/admin';
import Layout from "./Components/Layout";
import AdminLogin from './pages/AdminLogin';



/*function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/admin" element={<Admin />} />
        
        <Route path="/admin-login" element={<AdminLogin />} />

      </Routes>
      
  );
}

export default App;*/
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin Login Modal */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Student Books Page with layout */}
        <Route
          path="/books"
          element={
            <Layout activePage="books">
              <BooksPage />
            </Layout>
          }
        />
  </Routes>
    </Router>
  );
};

export default App;