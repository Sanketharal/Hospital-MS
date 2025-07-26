import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-hospital me-2"></i>
          Receptionist Dashboard
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive('/')}`} to="/">
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive('/patients') ? 'active' : ''}`} to="/patients">
                <i className="bi bi-people me-1"></i> Patients
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive('/doctors') ? 'active' : ''}`} to="/doctors">
                <i className="bi bi-person-badge me-1"></i> Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive('/appointments') ? 'active' : ''}`} to="/appointments">
                <i className="bi bi-calendar-check me-1"></i> Appointments
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
