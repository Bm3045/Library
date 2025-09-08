import { useState, useEffect } from 'react';
import { borrowAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const MyBooks = () => {
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBorrowHistory();
  }, []);

  const fetchBorrowHistory = async () => {
    try {
      const response = await borrowAPI.getHistory();
      setBorrowHistory(response.data);
    } catch (error) {
      console.error('Error fetching borrow history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold">My Borrow History</h1>

      {borrowHistory.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">You haven't borrowed any books yet.</p>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Book</th>
                  <th>Borrow Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {borrowHistory.map((record) => (
                  <tr key={record._id}>
                    <td>
                      <div className="fw-semibold">{record.book.title}</div>
                      <small className="text-muted">by {record.book.author}</small>
                    </td>
                    <td>{formatDate(record.borrowDate)}</td>
                    <td>
                      {record.returnDate
                        ? formatDate(record.returnDate)
                        : <span className="text-muted">Not returned yet</span>}
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill ${
                          record.status === 'borrowed'
                            ? 'bg-warning text-dark'
                            : 'bg-success'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
