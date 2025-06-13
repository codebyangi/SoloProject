import axios from 'axios';

const patientsApiUrl = 'http://localhost:8085/patients';

/**
 * Fetches patient data from the backend.
 *
 * This asynchronous functions makes a GET, POST, PUT, DELETE requests
 * to the provided API URL to retrieve patient data.
 * If the request is not successful, it throws an error.
 *
 */

export const getAllPatients = async () => {
  try {
    const response = await axios.get(patientsApiUrl);
    return response.data;
  } catch (error) {
    throw Error(`Error fetching reservations: ${error.message}`);
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(`${patientsApiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw Error(`Error fetching patient: ${error.message}`);
  }
};

export const createPatient = async (patientToCreate) => {
  try {
    const response = await axios.post(patientsApiUrl, patientToCreate);
    return response.data;
  } catch (error) {
    throw Error(`Error creating patient: ${error.message}`);
  }
};

export const updatePatient = async (patientToEdit) => {
  try {
    const response = await axios.put(`${patientsApiUrl}/${patientToEdit.id}`, patientToEdit);
    return response.data;
  } catch (error) {
    throw Error(`Error updating patient: ${error.message}`);
  }
};

export const deletePatient = async (patientId) => {
  try {
    const response = await axios.delete(`${patientsApiUrl}/${patientId}`);
    return response.data;
  } catch (error) {
    throw Error(`Error deleting patient: ${error.message}`);
  }
};
