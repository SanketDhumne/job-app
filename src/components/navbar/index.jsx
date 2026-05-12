import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './index.css';

const Navbar = ({ hideLinks = false }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'light';
    setIsDarkMode(savedTheme === 'dark');
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  const onLogout = () => {
    Cookies.remove('myToken');
    navigate('/login');
  };

  const token = Cookies.get('myToken');
  const shouldHideLinks = hideLinks || token === undefined;

  return (
    <nav className="navbar navbar-expand-lg sticky-top glass-card rounded-0 border-top-0 border-start-0 border-end-0 mb-4 px-3" style={{ zIndex: 1000 }}>
      <div className="container-fluid">
        {shouldHideLinks ? (
          <span className="navbar-brand fw-bold fs-3" style={{ color: 'var(--primary-color)' }}>
            Jobs4Pro
          </span>
        ) : (
          <Link to="/" className="navbar-brand fw-bold fs-3" style={{ color: 'var(--primary-color)' }}>
            Jobs4Pro
          </Link>
        )}

        {!shouldHideLinks && (
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--text-main)" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
        )}

        <div className={`collapse navbar-collapse ${shouldHideLinks ? 'd-flex justify-content-end' : ''}`} id="navbarNav">
          {!shouldHideLinks && (
            <ul className="navbar-nav mx-auto gap-4 my-3 my-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link text-dynamic fw-medium fs-5">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/jobs" className="nav-link text-dynamic fw-medium fs-5">
                  Jobs
                </Link>
              </li>
            </ul>
          )}

          <div className="d-flex align-items-center gap-3 ms-auto">
            <button 
              onClick={toggleTheme} 
              className="btn btn-link text-dynamic p-0 text-decoration-none"
              title="Toggle Theme"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-sun-fill text-warning" viewBox="0 0 16 16">
                  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-moon-fill" viewBox="0 0 16 16">
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                </svg>
              )}
            </button>
            {!shouldHideLinks && (
              <button
                className="btn btn-premium px-4"
                onClick={onLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;