//package com.hospital.controller;
//
//import com.hospital.model.Patient;
//import com.hospital.repository.PatientRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/patients")
//public class PatientController {
//
//    @Autowired
//    private PatientRepository patientRepo;
//
//    @GetMapping
//    public List<Patient> getAllPatients() {
//        return patientRepo.findAll();
//    }
//
//    @PostMapping
//    public Patient createPatient(@RequestBody Patient patient) {
//        return patientRepo.save(patient);
//    }
//
//    @PutMapping("/{id}")
//    public Patient updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
//        Patient patient = patientRepo.findById(id).orElseThrow();
//        patient.setName(patientDetails.getName());
//        patient.setAge(patientDetails.getAge());
//        patient.setDeases(patientDetails.getDeases());
//        return patientRepo.save(patient);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deletePatient(@PathVariable Long id) {
//        patientRepo.deleteById(id);
//    }
//}



// new code

package com.hospital.controller;

import com.hospital.model.Patient;
import com.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientRepository patientRepo;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        System.out.println("Creating patient: " + patient.toString());
        return patientRepo.save(patient);
    }

    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
        System.out.println("Updating patient with ID: " + id);
        System.out.println("Received patient details: " + patientDetails.toString());

        Patient patient = patientRepo.findById(id).orElseThrow();
        patient.setName(patientDetails.getName());
        patient.setAge(patientDetails.getAge());
        patient.setDeases(patientDetails.getDeases());

        System.out.println("Updated patient before save: " + patient.toString());
        return patientRepo.save(patient);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientRepo.deleteById(id);
    }
}