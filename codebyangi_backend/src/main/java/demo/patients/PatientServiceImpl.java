package demo.patients;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * PatientServiceImpl is a public class that implements the PatientService interface.
 * It holds the implementations for each method inside the interface.
 * Has a PatientRepository dependency.
 */

@Service
public class PatientServiceImpl implements PatientService {

    PatientRepository patientRepository;
    PatientValidator patientValidator = new PatientValidator();

    /**
     * Constructor that uses annotation to tell Spring that when starting the server to create a PatientRepository and before that make sure we have a valid one and inject it here.
     *
     * @param patientRepository The repository for managing patient data.
     */
    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository) {

        this.patientRepository = patientRepository;
    }

    /**
     * Retrieves all patients from the database.
     *
     * @return A list of all patients.
     */
    @Override
    public List<Patient> getPatients() {

        return patientRepository.findAll();
    }

    /**
     * Retrieves a patient by its ID from database.
     *
     * @param id The ID of the patient we want to retrieve.
     * @return The patient with the specified ID.
     * @throws ResponseStatusException If the patient was not found in database sends an error response with a status code of 404.
     */
    @Override
    public Patient getPatientById(int id) {

        return patientRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient was not found"));
    }

    /**
     * Creates a new patient and saves it to the database.
     *
     * @param patientToCreate The patient we want to create.
     * @return The new patient added to database.
     * @throws ResponseStatusException If any validation fails or there is already a patient with the given SSN or email in the database
     */
    @Override
    public Patient createPatient(Patient patientToCreate) {
        String uniqueField = patientValidator.existBySSN(patientToCreate.getSsn(), getPatients()) + patientValidator.existByEmail(patientToCreate.getEmail(), getPatients());
        if(!uniqueField.isBlank()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, uniqueField);
        }

        String errors = patientValidator.validatePatient(patientToCreate);
        if(!errors.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errors);
        }

        patientRepository.save(patientToCreate);
        return patientToCreate;
    }

    /**
     * Edits an existing patient from database.
     *
     * @param patientToEdit The patient to edit, with updated fields.
     * @param id  The ID of the patient to edit.
     * @return The updated patient.
     * @throws ResponseStatusException If the patient was not found or if any validation fails or there is already a patient with the given SSN or email in the database
     */
    @Override
    public Patient editPatient(Patient patientToEdit, int id) {

        Patient existingPatient = getPatientById(id);

        if (existingPatient != null) {
            String uniqueField = patientValidator.existBySSN(patientToEdit.getSsn(), getPatients(), id) + patientValidator.existByEmail(patientToEdit.getEmail(), getPatients(), id);
            if(!uniqueField.isBlank()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, uniqueField);
            }

            String errors = patientValidator.validatePatient(patientToEdit);
            if(!errors.isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errors);
            }
            patientToEdit.setId(id);
            patientRepository.save(patientToEdit);
        }
        return patientToEdit;
    }

    /**
     * Deletes a patient by its ID from database.
     *
     * @param id The ID of the patient to delete.
     * @throws ResponseStatusException If the patient was not found in the database.
     */
    @Override
    public void deletePatient(int id) {

        if (getPatientById(id) != null) {
            patientRepository.deleteById(id);
        }
    }
}