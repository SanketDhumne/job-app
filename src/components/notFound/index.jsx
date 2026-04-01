import { Link } from 'react-router-dom';
import Navbar from '../navbar';
import './index.css';

const NotFound = () => {
  return (
    <>
      <Navbar />

      <div className="notfound-wrapper container-fluid">
        <div className="row min-vh-100 align-items-center justify-content-center text-center">
          <div className="col-12 col-md-8 col-lg-6">
            <h1 className="notfound-code">404</h1>

            <h2 className="notfound-title">
              Page Not Found
            </h2>

            <p className="notfound-description">
              The page you are looking for doesn’t exist or has been moved.
              Let’s get you back to something useful.
            </p>

            <Link to="/" className="btn btn-primary btn-lg mt-3">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;