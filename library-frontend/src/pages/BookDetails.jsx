import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { booksAPI, borrowAPI } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const BookDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await booksAPI.getOne(id);
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book:", error);
      toast.error("Failed to load book details");
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async () => {
    try {
      await borrowAPI.borrow(id);
      toast.success("Book borrowed successfully!");
      fetchBook(); // Refresh book data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to borrow book");
    }
  };

  const handleReturn = async () => {
    try {
      await borrowAPI.return(id);
      toast.success("Book returned successfully!");
      fetchBook(); // Refresh book data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to return book");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!book) {
    return (
      <div className="container py-5 text-center">
        <h1 className="text-danger fw-bold">Book not found</h1>
        <Link to="/" className="btn btn-link mt-3">
          Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <Link to="/" className="btn btn-link mb-3">
            ← Back to Books
          </Link>

          <h1 className="card-title h3 fw-bold mb-3">{book.title}</h1>
          <h5 className="text-muted mb-2">by {book.author}</h5>
          <p className="text-secondary mb-4">ISBN: {book.isbn}</p>

          <div className="mb-4">
            <span
              className={`badge px-3 py-2 ${
                book.available ? "bg-success" : "bg-danger"
              }`}
            >
              {book.available ? "Available" : "Currently Borrowed"}
            </span>
          </div>

          {book.addedBy && (
            <p className="text-muted mb-4">
              Added by: {book.addedBy.name} ({book.addedBy.email})
            </p>
          )}

          {isAuthenticated && (
            <div className="d-flex gap-3 flex-wrap">
              {book.available ? (
                <button
                  onClick={handleBorrow}
                  className="btn btn-primary"
                >
                  Borrow This Book
                </button>
              ) : user.role === "admin" ? (
                <button
                  onClick={handleReturn}
                  className="btn btn-success"
                >
                  Return This Book
                </button>
              ) : (
                <p className="text-danger fw-semibold">
                  This book is currently unavailable for borrowing.
                </p>
              )}

              {user.role === "admin" && (
                <Link to={`/book/edit/${book._id}`} className="btn btn-secondary">
                  Edit Book
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
