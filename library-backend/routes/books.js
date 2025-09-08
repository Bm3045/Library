const express = require('express');
const {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getBooks)
  .post(protect, admin, addBook);

router.route('/:id')
  .get(getBook)
  .put(protect, admin, updateBook)
  .delete(protect, admin, deleteBook);

// Temporary route to seed books (remove in production)
router.post('/seed-books', protect, admin, async (req, res) => {
  try {
    // Clear existing books
    await Book.deleteMany({});
    
    // Add admin user ID to each book
    const booksWithAdmin = sampleBooks.map(book => ({
      ...book,
      addedBy: req.user.id
    }));

    // Insert sample books
    await Book.insertMany(booksWithAdmin);
    
    res.json({ message: '50 books added successfully' });
  } catch (error) {
    console.error('Error seeding books:', error);
    res.status(500).json({ message: 'Error seeding books' });
  }
});

module.exports = router;