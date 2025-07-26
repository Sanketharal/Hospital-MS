import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = {
  // Patient endpoints
  getAllPatients: () => axios.get(`${API_BASE_URL}/patients`),
  getPatientById: (id) => axios.get(`${API_BASE_URL}/patients/${id}`),
  createPatient: (patient) => axios.post(`${API_BASE_URL}/patients`, patient),
  updatePatient: (id, patient) => axios.put(`${API_BASE_URL}/patients/${id}`, patient),
  deletePatient: (id) => axios.delete(`${API_BASE_URL}/patients/${id}`),
  
  // Doctor endpoints
  getAllDoctors: () => axios.get(`${API_BASE_URL}/doctors`),
  getDoctorById: (id) => axios.get(`${API_BASE_URL}/doctors/${id}`),
  createDoctor: (doctor) => axios.post(`${API_BASE_URL}/doctors`, doctor),
  updateDoctor: (id, doctor) => axios.put(`${API_BASE_URL}/doctors/${id}`, doctor),
  deleteDoctor: (id) => axios.delete(`${API_BASE_URL}/doctors/${id}`),
  
  // Appointment endpoints
  getAllAppointments: () => axios.get(`${API_BASE_URL}/appointments`),
  getAppointmentById: (id) => axios.get(`${API_BASE_URL}/appointments/${id}`),
  createAppointment: (appointment) => axios.post(`${API_BASE_URL}/appointments`, appointment),
  updateAppointment: (id, appointment) => axios.put(`${API_BASE_URL}/appointments/${id}`, appointment),
  deleteAppointment: (id) => axios.delete(`${API_BASE_URL}/appointments/${id}`)
};

export default api;
