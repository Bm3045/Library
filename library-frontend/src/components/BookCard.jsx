import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { borrowAPI } from '../services/api';
import { toast } from 'react-toastify';

const BookCard = ({ book, onUpdate }) => {
  const { isAuthenticated, user } = useAuth();

  const handleBorrow = async () => {
    try {
      await borrowAPI.borrow(book._id);
      toast.success('Book borrowed successfully!');
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to borrow book');
    }
  };

  const handleReturn = async () => {
    try {
      await borrowAPI.return(book._id);
      toast.success('Book returned successfully!');
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to return book');
    }
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/book/${book._id}`} className="text-decoration-none text-dark">
            {book.title}
          </Link>
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">by {book.author}</h6>
        <p className="card-text">
          <small className="text-muted">ISBN: {book.isbn}</small>
        </p>

        <div className="d-flex justify-content-between align-items-center">
          <span
            className={`badge ${book.available ? 'bg-success' : 'bg-danger'}`}
          >
            {book.available ? 'Available' : 'Borrowed'}
          </span>

          {isAuthenticated && (
            <div className="btn-group">
              {book.available ? (
                <button
                  onClick={handleBorrow}
                  className="btn btn-sm btn-primary"
                >
                  Borrow
                </button>
              ) : user.role === 'admin' ? (
                <button
                  onClick={handleReturn}
                  className="btn btn-sm btn-success"
                >
                  Return
                </button>
              ) : null}

              {user.role === 'admin' && (
                <Link
                  to={`/book/edit/${book._id}`}
                  className="btn btn-sm btn-secondary"
                >
                  Edit
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
