import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        {/* Hero Section */}
        <section className="text-center py-5">
          <h1 className="display-4 fw-bold mb-4">
            Welcome to the Library Management System
          </h1>
          <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: "700px" }}>
            Discover, borrow, and manage books with our easy-to-use library system. 
            Whether you're a student, teacher, or book lover, we've got you covered.
          </p>
          
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/books" 
                  className="btn btn-primary btn-lg"
                >
                  Browse Books
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/dashboard" 
                    className="btn btn-success btn-lg"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="btn btn-primary btn-lg"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login" 
                  className="btn btn-outline-primary btn-lg"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-5">
          <h2 className="h2 fw-bold text-center mb-5">
            Why Choose Our Library System?
          </h2>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <div className="fs-1 text-primary mb-3">📚</div>
                  <h3 className="h5 fw-semibold mb-3">Extensive Collection</h3>
                  <p className="text-muted">
                    Access thousands of books across various genres and subjects.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <div className="fs-1 text-success mb-3">⚡</div>
                  <h3 className="h5 fw-semibold mb-3">Easy Borrowing</h3>
                  <p className="text-muted">
                    Simple and quick process to borrow and return books.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <div className="fs-1 text-purple mb-3">📱</div>
                  <h3 className="h5 fw-semibold mb-3">Mobile Friendly</h3>
                  <p className="text-muted">
                    Access your library account from any device, anywhere.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
