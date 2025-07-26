import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    disease: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchPatient();
    }
  }, [id]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const response = await api.getPatientById(id);
      setFormData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch patient data. Please try again later.');
      setLoading(false);
      console.error('Error fetching patient:', err);
    }
  };

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
      if (!formData.name || !formData.age) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      
      if (isEditMode) {
        await api.updatePatient(id, formData);
      } else {
        await api.createPatient(formData);
      }
      
      setLoading(false);
      navigate('/patients');
    } catch (err) {
      setError('Failed to save patient data. Please try again later.');
      setLoading(false);
      console.error('Error saving patient:', err);
    }
  };

  if (loading && isEditMode) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="row">
      <div className="col-lg-6 mx-auto">
        <div className="card">
          <div className="card-header">
            <h3>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</h3>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Patient Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="disease" className="form-label">Disease/Condition</label>
                <input
                  type="text"
                  className="form-control"
                  id="disease"
                  name="disease"
                  value={formData.disease}
                  onChange={handleChange}
                  placeholder="Enter patient's disease or condition"
                />
              </div>
              
              <div className="btn-container">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => navigate('/patients')}
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
                    isEditMode ? 'Update Patient' : 'Save Patient'
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

export default PatientForm;
