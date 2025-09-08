const express = require('express');
const {
  borrowBook,
  returnBook,
  getBorrowHistory,
  getAllBorrowRecords,
} = require('../controllers/borrowController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/history', protect, getBorrowHistory);
router.get('/all', protect, admin, getAllBorrowRecords);
router.post('/:id/borrow', protect, borrowBook);
router.post('/:id/return', protect, returnBook);

module.exports = router;