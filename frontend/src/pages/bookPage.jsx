import React from 'react';
import BookList from '../../components/bookList';

const BooksPage = ({ books, onAddBook, onEditBook, onDeleteBook }) => {
  return (
    <BookList 
      books={books} 
      onAdd={onAddBook} 
      onEdit={onEditBook} 
      onDelete={onDeleteBook} 
    />
  );
};

export default BooksPage;