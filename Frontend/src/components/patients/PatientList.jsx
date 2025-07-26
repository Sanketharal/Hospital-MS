import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await api.getAllPatients();
      setPatients(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch patients. Please try again later.');
      setLoading(false);
      console.error('Error fetching patients:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await api.deletePatient(id);
        // Refresh the patient list
        fetchPatients();
      } catch (err) {
        setError('Failed to delete patient. Please try again.');
        console.error('Error deleting patient:', err);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mb-0">
            <i className="bi bi-people-fill me-2 text-primary"></i>
            Patients
          </h2>
          <Link to="/patients/add" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Add New Patient
          </Link>
        </div>
      </div>
      
      <div className="card-body">
        {patients.length === 0 ? (
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            No patients found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Disease</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.disease || '-'}</td>
                    <td>
                      <Link to={`/patients/edit/${patient.id}`} className="btn btn-sm btn-primary me-2">
                        <i className="bi bi-pencil-square me-1"></i>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="bi bi-trash me-1"></i>
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
};

export default PatientList;

