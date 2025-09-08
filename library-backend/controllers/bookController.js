const Book = require('../models/Book');

// Get all books with filtering and search
const getBooks = async (req, res, next) => {
  try {
    const { search, available } = req.query;
    
    let query = {};
    
    // Search by title or author
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by availability
    if (available !== undefined) {
      query.available = available === 'true';
    }
    
    const books = await Book.find(query).populate('addedBy', 'name email');
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// Get single book
const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'name email');
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Add new book (Admin only)
const addBook = async (req, res, next) => {
  try {
    const { title, author, isbn } = req.body;
    
    const bookExists = await Book.findOne({ isbn });
    
    if (bookExists) {
      return res.status(400).json({ message: 'Book with this ISBN already exists' });
    }
    
    const book = await Book.create({
      title,
      author,
      isbn,
      addedBy: req.user.id
    });
    
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

// Update book (Admin only)
const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

// Delete book (Admin only)
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    await Book.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Book removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
};