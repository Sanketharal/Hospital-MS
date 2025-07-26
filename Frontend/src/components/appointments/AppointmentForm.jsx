import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AppointmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDateTime: ''
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch patients and doctors data
    const fetchData = async () => {
      try {
        setLoading(true);
        const [patientsRes, doctorsRes] = await Promise.all([
          api.getAllPatients(),
          api.getAllDoctors()
        ]);
        
        setPatients(patientsRes.data);
        setDoctors(doctorsRes.data);
        
        // If in edit mode, fetch the appointment details
        if (isEditMode) {
          const appointmentRes = await api.getAppointmentById(id);
          
          // Format the datetime for the input field (yyyy-MM-ddThh:mm)
          const appointmentData = appointmentRes.data;
          if (appointmentData.appointmentDateTime) {
            const date = new Date(appointmentData.appointmentDateTime);
            const formattedDate = date.toISOString().slice(0, 16);
            appointmentData.appointmentDateTime = formattedDate;
          }
          
          setFormData(appointmentData);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Validate inputs
      if (!formData.patientId || !formData.doctorId || !formData.appointmentDateTime) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      
      if (isEditMode) {
        await api.updateAppointment(id, formData);
      } else {
        await api.createAppointment(formData);
      }
      
      setLoading(false);
      navigate('/appointments');
    } catch (err) {
      setError('Failed to save appointment data. Please try again later.');
      setLoading(false);
      console.error('Error saving appointment:', err);
    }
  };

  if (loading && (isEditMode || !patients.length || !doctors.length)) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="row">
      <div className="col-lg-6 mx-auto">
        <div className="card">
          <div className="card-header">
            <h3>{isEditMode ? 'Edit Appointment' : 'Schedule New Appointment'}</h3>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="patientId" className="form-label">Patient</label>
                <select
                  className="form-select"
                  id="patientId"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} (Age: {patient.age})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-3">
                <label htmlFor="doctorId" className="form-label">Doctor</label>
                <select
                  className="form-select"
                  id="doctorId"
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr. {doctor.name} ({doctor.specialization})
                    </option>
                  ))}
                </select>
              </div>
                <div className="mb-3">
                <label htmlFor="appointmentDateTime" className="form-label">Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="appointmentDateTime"
                  name="appointmentDateTime"
                  value={formData.appointmentDateTime}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="btn-container">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => navigate('/appointments')}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    isEditMode ? 
                    <>
                      <i className="bi bi-calendar-check me-2"></i>
                      Update Appointment
                    </> : 
                    <>
                      <i className="bi bi-calendar-plus me-2"></i>
                      Schedule Appointment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
