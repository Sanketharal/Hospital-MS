package com.hospital.controller;

import com.hospital.model.Doctor;
import com.hospital.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepo;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorRepo.findAll();
    }

    @PostMapping
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorRepo.save(doctor);
    }

    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable Long id, @RequestBody Doctor doctorDetails) {
        Doctor doctor = doctorRepo.findById(id).orElseThrow();
        doctor.setName(doctorDetails.getName());
        doctor.setSpecialization(doctorDetails.getSpecialization());
        return doctorRepo.save(doctor);
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable Long id) {
        doctorRepo.deleteById(id);
    }
}
