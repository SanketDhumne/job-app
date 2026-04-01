import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove('myToken');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid px-4">
        <Link to="/" className="navbar-brand brand-logo">
          Jobs4Pro
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-4">
            <li className="nav-item">
              <Link to="/" className="nav-link nav-link-custom">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/jobs" className="nav-link nav-link-custom">
                Jobs
              </Link>
            </li>
          </ul>

          <button
            className="btn btn-outline-primary logout-btn"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;