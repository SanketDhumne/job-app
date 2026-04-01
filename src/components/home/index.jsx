import { Link } from 'react-router-dom';
import Navbar from '../navbar';
import './index.css';

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="home-hero container-fluid">
        <div className="row min-vh-100 align-items-center">
          <div className="col-12 col-md-6 px-5">
            <h1 className="home-title">
              Find Your <span>Dream Job</span> Today
            </h1>

            <p className="home-description">
              Jobs4Pro helps you discover thousands of job opportunities
              from top companies. Build your career with confidence and
              take the next step toward success.
            </p>

            <div className="mt-4">
              <Link to="/jobs" className="btn btn-primary btn-lg">
                Browse Jobs
              </Link>
            </div>
          </div>

          <div className="col-12 col-md-6 text-center">
            <div className="home-illustration">
              <h2>💼 🚀 📈</h2>
              <p className="text-muted mt-3">
                Opportunities that match your skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;