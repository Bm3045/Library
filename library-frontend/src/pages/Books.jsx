import { useState, useEffect } from "react";
import { booksAPI } from "../services/api";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = searchQuery ? { search: searchQuery } : {};
      const response = await booksAPI.getAll(params);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold">Library Books</h1>

      <SearchBar
        onSearch={handleSearch}
        placeholder="Search by title or author..."
      />

      {books.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">
            {searchQuery
              ? "No books found matching your search."
              : "No books available in the library."}
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {books.map((book) => (
            <div key={book._id} className="col-12 col-md-6 col-lg-4">
              <BookCard book={book} onUpdate={fetchBooks} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
