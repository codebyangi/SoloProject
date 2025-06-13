package demo.patients;

import java.util.List;

/**
 * The PatientService interface works as a contract.
 * It defines what actions our PatientService can take; we are just defining the signatures of the methods, not the implementation.
 * It provides methods to retrieve, create, edit, and delete patients.
 */

public interface PatientService {

    /**
     * Retrieves a list of all patients.
     *
     * @return A list of Patient objects.
     */
    List<Patient> getPatients();

    /**
     * Retrieves a patient by its ID(unique identifier).
     *
     * @param id The ID of the patient we want to retrieve.
     * @return The Patient object with the specified ID.
     */
    Patient getPatientById (int id);

    /**
     * Creates a new patient.
     *
     * @param patientToCreate The Patient object we want to create.
     * @return The created Patient object.
     */
    Patient createPatient(Patient patientToCreate);

    /**
     * Edits an existing patient with a specified ID(unique identifier).
     *
     * @param patientToEdit The Patient object to edit, with updated fields.
     * @param id The ID of the patient to edit.
     * @return The updated Patient object.
    */
    Patient editPatient(Patient patientToEdit, int id);

    /**
     * Deletes a patient by its ID(unique identifier).
     *
     * @param id The ID of the patient to delete.
     */
    void deletePatient(int id);
}