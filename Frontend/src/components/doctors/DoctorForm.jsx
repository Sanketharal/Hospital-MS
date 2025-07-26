import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DoctorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    specialization: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchDoctor();
    }
  }, [id]);

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      const response = await api.getDoctorById(id);
      setFormData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch doctor data. Please try again later.');
      setLoading(false);
      console.error('Error fetching doctor:', err);
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
      if (!formData.name || !formData.specialization) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      
      if (isEditMode) {
        await api.updateDoctor(id, formData);
      } else {
        await api.createDoctor(formData);
      }
      
      setLoading(false);
      navigate('/doctors');
    } catch (err) {
      setError('Failed to save doctor data. Please try again later.');
      setLoading(false);
      console.error('Error saving doctor:', err);
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
            <h3>{isEditMode ? 'Edit Doctor' : 'Add New Doctor'}</h3>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Doctor Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
                <div className="mb-3">
                <label htmlFor="specialization" className="form-label">Specialization</label>
                <input
                  type="text"
                  className="form-control"
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="btn-container">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => navigate('/doctors')}
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
                    isEditMode ? 'Update Doctor' : 'Save Doctor'
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

export default DoctorForm;
