const bookModel = require('../models/bookModel');

const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookModel.getBookById(id);
    res.json(book);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const addBook = async (req, res) => {
  const { title, author, isbn, publication_year } = req.body;
  try {
    const newBookId = await bookModel.addBook(title, author, isbn, publication_year);
    res.status(201).json({ id: newBookId, title, author, isbn, publication_year });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, publication_year } = req.body;
  try {
    await bookModel.updateBook(id, title, author, isbn, publication_year);
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await bookModel.deleteBook(id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
