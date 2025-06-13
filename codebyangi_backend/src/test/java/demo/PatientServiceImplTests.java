package demo;

import demo.patients.Patient;
import demo.patients.PatientRepository;
import demo.patients.PatientService;
import demo.patients.PatientServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the PatientServiceImpl class.
 */
@ExtendWith(MockitoExtension.class)
public class PatientServiceImplTests {

	PatientService patientService;

	@Mock
	PatientRepository patientRepository;
	Patient testPatient;
	Patient testPatientToEdit;

	/**
	 * Sets up the test environment before each test.
	 * Initializes the PatientServiceImpl and a default Patient instance.
	 */
	@BeforeEach
	public void setup(){

		patientService = new PatientServiceImpl(patientRepository);
		testPatient = new Patient(1, "TestName", "Stephens","111-11-1111","vsteph@comcast.com","8430 W Sunset Blvd","Los Angeles","CA","90049",66,79,299,"Male","Self-Insured" );
		testPatientToEdit = new Patient(1, "Victor", "Stephens","222-22-2222","vsteph@comcast.org","8430 W Sunset Blvd","Los Angeles","CA","90049",66,79,299,"Male","Self-Insured" );
	}

	/**
	 * Tests retrieving all patients.
	 * Ensures that the returned list contains the expected number of patients.
	 */
	@Test
	public void getPatients_twoValidPatients_returnExactArrayLength(){

		List<Patient> testPatientsList = Arrays.asList(testPatient, testPatientToEdit);
		when(patientRepository.findAll()).thenReturn(testPatientsList);
		List<Patient> result = patientService.getPatients();
		assertEquals(2, result.size());
	}

	/**
	 * Tests retrieving a patient by its ID.
	 * Ensures that the patient is returned as expected.
	 */
	@Test
	public void getPatientById_withValidId_returnPatient(){

		when(patientRepository.findById(1)).thenReturn(Optional.of(testPatient));
		Patient result = patientService.getPatientById(1);
		assertNotNull(result);
		assertEquals(testPatient, result);

	}

	/**
	 * Tests retrieving a patient by its ID.
	 * Ensures that an error is thrown if the ID is not found.
	 */
	@Test
	public void getPatient_withInvalidID_returnsErrorWithMessage() {
		testPatient.setId(18);

		when(patientRepository.findById(testPatient.getId())).thenReturn(Optional.empty());
		assertThrows(ResponseStatusException.class, () -> patientService.getPatientById(testPatient.getId()), "Patient was not found.");
	}

	/**
	 * Tests the creation of a patient with valid data.
	 * Ensures that the created patient is returned as expected.
	 */
	@Test
	public void createPatient_withValidPatient_returnsPersistedPatient() {

		when(patientRepository.save(any(Patient.class))).thenReturn(testPatient);
		Patient result = patientService.createPatient(testPatient);
		assertEquals("TestName", result.getFirstName(), "We did not get what expected");
	}

	/**
	 * Tests the creation of a patient with invalid data.
	 * Ensures that an error is thrown.
	 */
	@Test
	public void createPatient_withInvalidPatient_throwsError() {
		testPatient.setEmail("");

		assertThrows(ResponseStatusException.class, () -> patientService.createPatient(testPatient), "Patient was saved.");
	}

	/**
	 * Tests the creation of a patient with an existing title.
	 * Ensures that an error is thrown.
	 */
	@Test
	public void createPatient_withDuplicatePatient_throwsError() {
		List<Patient> samplePatientList = Arrays.asList(
				testPatient,
				testPatient
		);
		when(patientRepository.findAll()).thenReturn(samplePatientList);
		assertThrows(ResponseStatusException.class, () -> patientService.createPatient(testPatient));
	}

	/**
	 * Tests editing an existing patient with valid data.
	 * Ensures that the edited patient is returned as expected.
	 */
	@Test
	public void editPatient_withValidPatientAndExistingId_returnPatientToEdit(){

		when(patientRepository.findById(2)).thenReturn(Optional.of(testPatientToEdit));
		when(patientRepository.save(testPatientToEdit)).thenReturn(testPatientToEdit);
		Patient result = patientService.editPatient(testPatientToEdit,2);
		assertEquals(testPatientToEdit.getSsn(), result.getSsn());
	}

	/**
	 * Tests editing an id for an existing patient with valid data.
	 * Ensures that the edited patient has the same id.
	 */
	@Test
	public void editPatient_whenTryingToUpdateId_shouldDefaultToPathId() {
		int id = testPatient.getId();
		when(patientRepository.findById(id)).thenReturn(Optional.of(testPatient));
		when(patientRepository.save(testPatientToEdit)).thenReturn(testPatientToEdit);
		testPatientToEdit.setId(25);
		Patient editedPatient = patientService.editPatient(testPatientToEdit, id);
		assertEquals(id, editedPatient.getId());
		assertNotEquals(99, editedPatient.getId());
	}

	/**
	 * Tests editing a patient with invalid data.
	 * Ensures that an error is thrown.
	 */
	@Test
	public void editPatient_whenEmailIsEmpty_shouldReturn400Error() {
		testPatientToEdit.setEmail("");
		when(patientRepository.findById(2)).thenReturn(Optional.of(testPatient));
		ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> patientService.editPatient(testPatientToEdit, 2));
		assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
	}

	/**
	 * Tests editing an existing patient with invalid id.
	 * Ensures that an error is thrown.
	 */
	@Test
	public void editPatient_whenPatientIdIsNotValid_shouldReturn404Error() {
		int invalidID = 25; // Assuming this Patient ID does not exist
		when(patientRepository.findById(invalidID)).thenReturn(Optional.empty());
		ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> patientService.editPatient(testPatientToEdit, invalidID));
		assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
	}

	/**
	 * Tests deleting a patient by its ID.
	 * Ensures that the patient is deleted.
	 */
	@Test
	public void deletePatient_withExistingId(){

		when(patientRepository.findById(1)).thenReturn(Optional.of(testPatient));
		patientService.deletePatient(1);
		verify(patientRepository).findById(1);
		verify(patientRepository).deleteById(1);
	}

	/**
	 * Tests deleting a patient by its ID.
	 * Ensures that if the id is not found, it throws an error.
	 */
	@Test
	public void deletePatientByID_withInvalidID_throwsError() {
		int invalidID = 77;

		ResponseStatusException result = assertThrows(ResponseStatusException.class, () -> patientService.deletePatient(invalidID));
		assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
	}
}