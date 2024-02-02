const pool = require('../config/db');

const getAllBooks = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM books', (error, results) => {
      if (error) {
        reject(new Error('Error fetching books'));
      } else {
        resolve(results);
      }
    });
  });
};

const getBookById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM books WHERE id = ?', [id], (error, results) => {
      if (error) {
        reject(new Error('Error fetching book'));
      } else {
        if (results.length === 0) {
          reject(new Error('Book not found'));
        } else {
          resolve(results[0]);
        }
      }
    });
  });
};

const addBook = (title, author, isbn, publication_year) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO books (title, author, isbn, publication_year) VALUES (?, ?, ?, ?)',
      [title, author, isbn, publication_year],
      (error, results) => {
        if (error) {
          reject(new Error('Error adding book'));
        } else {
          resolve(results.insertId);
        }
      }
    );
  });
};

const updateBook = (id, title, author, isbn, publication_year) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE books SET title = ?, author = ?, isbn = ?, publication_year = ? WHERE id = ?',
      [title, author, isbn, publication_year, id],
      (error, results) => {
        if (error) {
          reject(new Error('Error updating book'));
        } else {
          if (results.affectedRows === 0) {
            reject(new Error('Book not found'));
          } else {
            resolve('Book updated successfully');
          }
        }
      }
    );
  });
};

const deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM books WHERE id = ?', [id], (error, results) => {
      if (error) {
        reject(new Error('Error deleting book'));
      } else {
        if (results.affectedRows === 0) {
          reject(new Error('Book not found'));
        } else {
          resolve('Book deleted successfully');
        }
      }
    });
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
