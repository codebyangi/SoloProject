package demo.patients;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * This is a Controller class, with a PatientService dependency.
 * Main job: to define the endpoints and deffer the logic to a service layer.
 * Uses annotation to signal the framework, exposes the endpoints for retrieving, creating, editing and deleting patients.
 */

@RestController

@RequestMapping(value = "/patients")
public class PatientController {

  PatientService patientService;

  @Autowired
  public PatientController(PatientService patientService) {
    this.patientService = patientService;
  }

  /**
   * Retrieves all patients by sending a GET request to host 8085/patients.
   * @return List of patients.
   */
  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<Patient> getPatients() {

    return patientService.getPatients();
  }

  /**
   * Retrieves a patient with the given ID, by sending a GET request to host 8085/patients/id.
   * @param id The ID of the patient to retrieve.
   * @return The patient with the specified ID
   */
  @GetMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public Patient getPatientById(@PathVariable int id) {

    return patientService.getPatientById(id);
  }

  /**
   * Creates a new patient by sending a POST request (needs a JSON body with the right attributes).
   * @param patientToCreate patient object representing the new patient that we want to add to database.
   * @return The created patient.
   */
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Patient createPatient(@RequestBody Patient patientToCreate) {

        return patientService.createPatient(patientToCreate);
  }

  /**
   * Edits an existing patient by sending a PUT request (needs a JSON body with the right attributes and an ID).
   * @param patientToEdit patient object representing the updated fields
   * @param id The ID of the patient to edit.
   * @return The updated patient.
   */
  @PutMapping(value = "/{id}")
  @ResponseStatus(HttpStatus.OK)
  public Patient editPatient(@RequestBody Patient patientToEdit, @PathVariable int id) {

    return patientService.editPatient(patientToEdit, id);
  }

  /**
   * Deletes a patient with the given ID by sending a DELETE request.
   * @param id The ID of the patient to delete.
   */
  @DeleteMapping(value = "/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deletePatient(@PathVariable int id) {

    patientService.deletePatient(id);
  }
}