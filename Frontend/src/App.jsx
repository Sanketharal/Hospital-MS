import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import PatientList from './components/patients/PatientList';
import PatientForm from './components/patients/PatientForm';
import DoctorList from './components/doctors/DoctorList';
import DoctorForm from './components/doctors/DoctorForm';
import AppointmentList from './components/appointments/AppointmentList';
import AppointmentForm from './components/appointments/AppointmentForm';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container-fluid flex-grow-1 py-4 px-md-5">
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/add" element={<PatientForm />} />
            <Route path="/patients/edit/:id" element={<PatientForm />} />
            
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/doctors/add" element={<DoctorForm />} />
            <Route path="/doctors/edit/:id" element={<DoctorForm />} />
            
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/appointments/add" element={<AppointmentForm />} />
            <Route path="/appointments/edit/:id" element={<AppointmentForm />} />
          </Routes>
        </div>
        
        <footer className="bg-light py-3 mt-auto">
          <div className="container text-center">
            <p className="text-muted mb-0">
              Hospital Management System &copy; {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}
  

export default App
