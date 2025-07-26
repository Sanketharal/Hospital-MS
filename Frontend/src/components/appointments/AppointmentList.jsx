import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appointmentsRes, patientsRes, doctorsRes] = await Promise.all([
        api.getAllAppointments(),
        api.getAllPatients(),
        api.getAllDoctors()
      ]);
      
      setAppointments(appointmentsRes.data);
      setPatients(patientsRes.data);
      setDoctors(doctorsRes.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
      console.error('Error fetching data:', err);
    }
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown';
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await api.deleteAppointment(id);
        // Refresh the appointment list
        fetchData();
      } catch (err) {
        setError('Failed to delete appointment. Please try again.');
        console.error('Error deleting appointment:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Appointments</h2>
        <Link to="/appointments/add" className="btn btn-success">
          Schedule New Appointment
        </Link>
      </div>

      {appointments.length === 0 ? (
        <div className="alert alert-info">No appointments found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{getPatientName(appointment.patientId)}</td>
                  <td>{getDoctorName(appointment.doctorId)}</td>
                  <td>{formatDate(appointment.appointmentDateTime)}</td>
                  <td>
                    <Link to={`/appointments/edit/${appointment.id}`} className="btn btn-sm btn-primary me-2">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(appointment.id)}
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
  );
};

export default AppointmentList;
