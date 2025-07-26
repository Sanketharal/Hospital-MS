import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Welcome to Hospital Management System</h1>
        <p className="lead text-muted">
          A comprehensive solution for efficient healthcare management
        </p>
      </div>
      
      <div className="row g-4 mt-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm home-card">
            <div className="card-body d-flex flex-column">
              <div className="text-center mb-4">
                <span className="display-4 text-primary">
                  <i className="bi bi-people-fill"></i>
                </span>
              </div>
              <h2 className="card-title fw-bold">Patients</h2>
              <p className="card-text flex-grow-1">
                Manage patient records including personal information and medical history. Keep track of all patient details in one place.
              </p>
              <Link to="/patients" className="btn btn-primary btn-lg mt-auto">
                <i className="bi bi-arrow-right-circle me-2"></i>
                Manage Patients
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm home-card">
            <div className="card-body d-flex flex-column">
              <div className="text-center mb-4">
                <span className="display-4 text-success">
                  <i className="bi bi-person-badge-fill"></i>
                </span>
              </div>
              <h2 className="card-title fw-bold">Doctors</h2>
              <p className="card-text flex-grow-1">
                Manage doctor information including specializations and availability. Organize your medical staff efficiently.
              </p>
              <Link to="/doctors" className="btn btn-success btn-lg mt-auto">
                <i className="bi bi-arrow-right-circle me-2"></i>
                Manage Doctors
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm home-card">
            <div className="card-body d-flex flex-column">
              <div className="text-center mb-4">
                <span className="display-4 text-danger">
                  <i className="bi bi-calendar-check-fill"></i>
                </span>
              </div>
              <h2 className="card-title fw-bold">Appointments</h2>
              <p className="card-text flex-grow-1">
                Schedule and manage appointments between patients and doctors. Streamline your hospital's appointment system.
              </p>
              <Link to="/appointments" className="btn btn-danger btn-lg mt-auto">
                <i className="bi bi-arrow-right-circle me-2"></i>
                Manage Appointments
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-5 pt-4">
        <p className="text-muted">
          Hospital Management System &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Home;
 