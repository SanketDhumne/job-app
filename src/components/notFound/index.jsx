import { Link } from 'react-router-dom';
import Navbar from '../navbar';
import './index.css';

const NotFound = () => {
  return (
    <div className="pb-5">
      <Navbar />

      <div className="container-fluid mt-5">
        <div className="row align-items-center justify-content-center text-center" style={{ minHeight: '60vh' }}>
          <div className="col-12 col-md-8 col-lg-6 glass-card p-5">
            <h1 className="notfound-code" style={{ color: 'var(--primary-color)' }}>404</h1>

            <h2 className="notfound-title text-dynamic fw-bold">
              Page Not Found
            </h2>

            <p className="notfound-description text-dynamic-muted fs-5 mt-3 mb-4">
              The page you are looking for doesn’t exist or has been moved.
              Let’s get you back to something useful.
            </p>

            <Link to="/" className="btn btn-premium btn-lg px-5">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;