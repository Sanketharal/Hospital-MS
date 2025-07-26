package com.hospital.controller;

import com.hospital.model.Appointment;
import com.hospital.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepo;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentRepo.save(appointment);
    }

    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody Appointment appointmentDetails) {
        Appointment appointment = appointmentRepo.findById(id).orElseThrow();
        appointment.setPatientId(appointmentDetails.getPatientId());
        appointment.setDoctorId(appointmentDetails.getDoctorId());
        appointment.setAppointmentDate(appointmentDetails.getAppointmentDate());
        return appointmentRepo.save(appointment);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentRepo.deleteById(id);
    }
}
