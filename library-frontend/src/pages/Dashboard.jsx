import { useState, useEffect } from "react";
import { booksAPI, borrowAPI } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    totalBorrows: 0,
  });
  const [recentBorrows, setRecentBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch books
      const booksResponse = await booksAPI.getAll();
      const allBooks = booksResponse?.data || [];

      // Fetch borrow records
      const borrowsResponse = await borrowAPI.getAllRecords();
      const allBorrows = borrowsResponse?.data || [];

      // Calculate stats
      const availableBooks = allBooks.filter((book) => book.available).length;
      const borrowedBooks = allBooks.filter((book) => !book.available).length;

      setStats({
        totalBooks: allBooks.length,
        availableBooks,
        borrowedBooks,
        totalBorrows: allBorrows.length,
      });

      // Get last 5 borrow records
      setRecentBorrows(allBorrows.slice(-5).reverse());
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold">Admin Dashboard</h1>

      {/* Statistics */}
      <div className="row g-4 mb-5">
        <StatCard title="Total Books" value={stats.totalBooks} color="text-primary" />
        <StatCard title="Available Books" value={stats.availableBooks} color="text-success" />
        <StatCard title="Borrowed Books" value={stats.borrowedBooks} color="text-danger" />
        <StatCard title="Total Borrows" value={stats.totalBorrows} color="text-purple" />
      </div>

      {/* Recent Borrows */}
      <div className="card shadow-sm">
        <div className="card-header bg-light fw-semibold">
          Recent Borrow Activities
        </div>
        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead className="table-light">
              <tr>
                <Th>User</Th>
                <Th>Book</Th>
                <Th>Borrow Date</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {recentBorrows.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">
                    No borrow records found
                  </td>
                </tr>
              ) : (
                recentBorrows.map((record) => (
                  <tr key={record._id}>
                    <td>
                      <div className="fw-bold">{record?.user?.name || "Unknown"}</div>
                      <small className="text-muted">{record?.user?.email || "-"}</small>
                    </td>
                    <td>
                      <div className="fw-bold">{record?.book?.title || "Untitled"}</div>
                      <small className="text-muted">
                        by {record?.book?.author || "Unknown"}
                      </small>
                    </td>
                    <td>{formatDate(record.borrowDate)}</td>
                    <td>
                      <span
                        className={`badge ${
                          record.status === "borrowed" ? "bg-warning text-dark" : "bg-success"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Small reusable components
const StatCard = ({ title, value, color }) => (
  <div className="col-12 col-md-6 col-lg-3">
    <div className="card shadow-sm h-100">
      <div className="card-body text-center">
        <h5 className="card-title text-muted">{title}</h5>
        <p className={`display-6 fw-bold ${color}`}>{value}</p>
      </div>
    </div>
  </div>
);

const Th = ({ children }) => (
  <th scope="col" className="text-uppercase small fw-semibold">
    {children}
  </th>
);

export default Dashboard;
