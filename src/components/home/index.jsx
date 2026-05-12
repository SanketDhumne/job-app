import { Link } from 'react-router-dom';
import Navbar from '../navbar';
import './index.css';

const Home = () => {
  return (
    <div className="pb-5">
      <Navbar />

      <div className="home-hero container-fluid mt-5">
        <div className="row align-items-center" style={{ minHeight: '70vh' }}>
          <div className="col-12 col-md-6 px-4 px-md-5 mb-5 mb-md-0">
            <h1 className="home-title text-dynamic fw-bold" style={{ fontSize: '3.5rem', lineHeight: '1.2' }}>
              Find Your <br/><span style={{ color: 'var(--primary-color)' }}>Dream Job</span> Today
            </h1>

            <p className="home-description text-dynamic-muted mt-4 fs-5" style={{ maxWidth: '500px', lineHeight: '1.6' }}>
              Jobs4Pro helps you discover thousands of job opportunities
              from top companies. Build your career with confidence and
              take the next step toward success.
            </p>

            <div className="mt-5">
              <Link to="/jobs" className="btn btn-premium btn-lg px-5 py-3 fs-5">
                Browse Jobs
              </Link>
            </div>
          </div>

          <div className="col-12 col-md-6 text-center">
            <div className="home-illustration glass-card p-5 d-inline-block">
              <h2 style={{ fontSize: '4rem' }}>💼 🚀 📈</h2>
              <p className="text-dynamic-muted mt-4 fs-5 fw-medium">
                Opportunities that match your skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;