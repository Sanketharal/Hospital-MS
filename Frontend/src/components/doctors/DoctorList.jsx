import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await api.getAllDoctors();
      setDoctors(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch doctors. Please try again later.');
      setLoading(false);
      console.error('Error fetching doctors:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await api.deleteDoctor(id);
        // Refresh the doctor list
        fetchDoctors();
      } catch (err) {
        setError('Failed to delete doctor. Please try again.');
        console.error('Error deleting doctor:', err);
      }
    }
  };
  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border text-success" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mb-0">
            <i className="bi bi-person-badge-fill me-2 text-success"></i>
            Doctors
          </h2>
          <Link to="/doctors/add" className="btn btn-success">
            <i className="bi bi-plus-circle me-2"></i>
            Add New Doctor
          </Link>
        </div>
      </div>
      
      <div className="card-body">
        {doctors.length === 0 ? (
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            No doctors found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td>
                    <Link to={`/doctors/edit/${doctor.id}`} className="btn btn-sm btn-primary me-2">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(doctor.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
}

export default DoctorList;
