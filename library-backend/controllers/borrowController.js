const BorrowRecord = require('../models/BorrowRecord');
const Book = require('../models/Book');

// Borrow a book
const borrowBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    if (!book.available) {
      return res.status(400).json({ message: 'Book is not available for borrowing' });
    }
    
    // Check if user already has this book borrowed
    const existingBorrow = await BorrowRecord.findOne({
      book: req.params.id,
      user: req.user.id,
      status: 'borrowed'
    });
    
    if (existingBorrow) {
      return res.status(400).json({ message: 'You have already borrowed this book' });
    }
    
    // Create borrow record
    const borrowRecord = await BorrowRecord.create({
      book: req.params.id,
      user: req.user.id,
      borrowDate: new Date()
    });
    
    // Update book availability
    book.available = false;
    await book.save();
    
    await borrowRecord.populate('book', 'title author isbn');
    await borrowRecord.populate('user', 'name email');
    
    res.status(201).json(borrowRecord);
  } catch (error) {
    next(error);
  }
};

// Return a book
const returnBook = async (req, res, next) => {
  try {
    const borrowRecord = await BorrowRecord.findOne({
      book: req.params.id,
      user: req.user.id,
      status: 'borrowed'
    });
    
    if (!borrowRecord) {
      return res.status(404).json({ message: 'No active borrow record found for this book' });
    }
    
    // Update borrow record
    borrowRecord.returnDate = new Date();
    borrowRecord.status = 'returned';
    await borrowRecord.save();
    
    // Update book availability
    const book = await Book.findById(req.params.id);
    book.available = true;
    await book.save();
    
    await borrowRecord.populate('book', 'title author isbn');
    await borrowRecord.populate('user', 'name email');
    
    res.json(borrowRecord);
  } catch (error) {
    next(error);
  }
};

// Get user's borrow history
const getBorrowHistory = async (req, res, next) => {
  try {
    const borrowRecords = await BorrowRecord.find({ user: req.user.id })
      .populate('book', 'title author isbn')
      .sort({ borrowDate: -1 });
    
    res.json(borrowRecords);
  } catch (error) {
    next(error);
  }
};

// Get all borrow records (Admin only)
const getAllBorrowRecords = async (req, res, next) => {
  try {
    const borrowRecords = await BorrowRecord.find()
      .populate('book', 'title author isbn')
      .populate('user', 'name email')
      .sort({ borrowDate: -1 });
    
    res.json(borrowRecords);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getBorrowHistory,
  getAllBorrowRecords,
};