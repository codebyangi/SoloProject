package demo.patients;

import java.util.Arrays;
import java.util.List;

public class PatientValidator {
    final List<String> US_states = Arrays.asList("AL", "AK", "AZ", "AR",
            "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY",
            "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
            "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
            "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY");

    final List<String> gender = Arrays.asList("Male", "Female", "Other");

    /**
     * Validates the fields of a patient.
     *
     * @return A string of errors. If no errors were found, returns an empty string.
     */

    public String  stringFieldValidation(String fieldName, String fieldToValidate, int maxLength) {
        String error = "";
        if (fieldToValidate == null) {
            error= fieldName + " is required.";
        } else if (fieldToValidate.isBlank()) {
                error += fieldName + " is empty.";
            }
        else {
            if (maxLength > 0 && fieldToValidate.length() >= maxLength) {
                error += "Please enter a " + fieldName + " shorter than " + maxLength + " characters.";
            }
            if ("Social Security Number".equalsIgnoreCase(fieldName)) {
                if (!fieldToValidate.matches("^\\d{3}-\\d{2}-\\d{4}$")) {
                    error += "Please enter a valid Social Security Number (format: DDD-DD-DDDD).";
                }
            } else if ("email".equalsIgnoreCase(fieldName)) {
                if (!fieldToValidate.matches("^[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]{2,}$")) {
                    error += "Please enter a valid " + fieldName + " X@X.X format.";
                }
            } else if ("street".equalsIgnoreCase(fieldName)) {
                if (!fieldToValidate.matches("^[a-zA-Z0-9\\-\\s',.]*$")) {
                    error += fieldName + " contains invalid characters (only alphanumeric characters, hyphens, apostrophes, spaces, commas, and periods are allowed).";
                }
            } else if ("state".equalsIgnoreCase(fieldName)) {
                if (!US_states.contains(fieldToValidate)) {
                    error += "Please add the right abbreviation of the state: two uppercase letters.";
                }
            } else if ("zipcode".equalsIgnoreCase(fieldName)) {
                if (!fieldToValidate.matches("^\\d{5}(?:-\\d{4})?$")) {
                    error += "Please enter a valid " + fieldName + " format (DDDDD or DDDDD-DDDD).";
                }
            } else if ("gender".equalsIgnoreCase(fieldName)) {
                if (!gender.contains(fieldToValidate)) {
                    error += "Please enter one of the following values for " + fieldName + ": Male, Female, or Other.";
                }
            }
            else {
                if (!fieldToValidate.matches("^[a-zA-Z\\-\\s',.]*$")) {
                    error += fieldName + " contains invalid characters (only alphabetic characters, hyphens, apostrophes, spaces, commas, and periods are allowed).";
                }
            }
        }
        return error;
    }

    /**
     * Validates the numeric field of a patient, to be numeric, positive, whole number only.
     *
     * @return A string of errors. If no errors were found, returns an empty string.
     */
    public String  integerFieldValidation(String fieldName, Integer fieldToValidate, int maxValue) {
        String error = "";
       if ("age".equalsIgnoreCase(fieldName)) {
           if (fieldToValidate == null) {
               error= " Age is required.";
           }
       }
       if (fieldToValidate != null) {
                if (fieldToValidate < 0) {
                    error = fieldName + " must be an integer positive number.";
                } else if (fieldToValidate > maxValue) {
                    error = fieldName + " cannot be greater than " + maxValue + ".";
                }
            }
        return error;
    }

    /**
     * Concatenates all the errors found after validating all fields for a Patient.
     *
     * @param patientToValidate The patient entity to validate
     * @return A string of all errors found. If no errors were found, returns an empty string.
     */
    public String validatePatient(Patient patientToValidate) {
        String error1 = stringFieldValidation("First name",patientToValidate.getFirstName(),30);
        String error2 = stringFieldValidation("Last name",patientToValidate.getLastName(),30);
        String error3 = stringFieldValidation("Social Security Number",patientToValidate.getSsn(),0);
        String error4 = stringFieldValidation("Email",patientToValidate.getEmail(),50);
        String error5 = stringFieldValidation("Street",patientToValidate.getStreet(),30);
        String error6 = stringFieldValidation("City",patientToValidate.getCity(),30);
        String error7 = stringFieldValidation("State",patientToValidate.getState(),0);
        String error8 = stringFieldValidation("ZipCode",patientToValidate.getZip(),0);
        String error9 = integerFieldValidation("Age",patientToValidate.getAge(),120);
        String error10 = integerFieldValidation("Height",patientToValidate.getHeight(),108);
        String error11 = integerFieldValidation("Weight",patientToValidate.getWeight(),1400);
        String error12 = stringFieldValidation("Gender",patientToValidate.getGender(),0);
        String error13 = stringFieldValidation("Insurance",patientToValidate.getInsurance(),50);

      return error1 + error2 + error3 + error4 + error5 + error6 + error7 + error8 + error9 + error10 + error11 + error12 + error13;
    }

    /**
     * Checks if a patient SSN is unique in the list of patients.
     *
     * @param ssn the patient SSN to check
     * @param listOfPatients the list of patients to check against
     * optional @param patientId utilized in editPatient
     * @return an error message if a matching SSN already exists, otherwise an empty string
     */
    public String existBySSN(String ssn, List<Patient> listOfPatients) {
        return existBySSN(ssn, listOfPatients, -1);
    }

    public String existBySSN(String ssn, List<Patient> listOfPatients, Integer patientId) {
            for (Patient patient : listOfPatients) {
                if (patient.getId() != (patientId) && patient.getSsn().equalsIgnoreCase(ssn)) {
                    return "Patient with this SSN already exists.";
                }
            }
            return "";
        }
    /**
     * Checks if a patient Email is unique in the list of patients.
     *
     * @param email the patient SSN to check
     * @param listOfPatients the list of patients to check against
     * optional @param patientId utilized in editPatient
     * @return an error message if a matching email already exists, otherwise an empty string
     */
    public String existByEmail(String email, List<Patient> listOfPatients) {
        return existByEmail(email, listOfPatients, -1);
    }

    public String existByEmail(String email, List<Patient> listOfPatients, Integer patientId) {
        for (Patient patient : listOfPatients) {
            if (patient.getId() != (patientId) && patient.getEmail().equalsIgnoreCase(email)) {
                return "Patient with this Email already exists.";
            }
        }
        return "";
    }
}

