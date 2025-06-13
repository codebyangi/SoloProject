import React, { useState } from 'react';
import './Component/Modal.css';
import PatientForm from './PatientForm';
import { updatePatient, getById } from './apiServicePatient';

/**
 * Component for editing a patient using a modal.
 * @param {Object} props - Component props.
 * @param {Object} props.fields - Fields configuration for the patient form.
 * @param {Object} props.patient - The patient object to edit.
 * @param {Function} props.onRefresh - Function to refresh the patients list after editing.
 * @param {Function} props.validation - Function to validate the patient data.
 * @returns {JSX.Element} Edit button and modal for editing patients.
 */
export default function EditPatientModal({
  fields, patient, onRefresh, validation
}) {
  const [modal, setModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState({
    id: '',
    firstName: '',
    lastName: '',
    ssn: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    insurance: ''
  });

  const [errors, setErrors] = useState({});

  /**
   * Toggles the visibility of the modal.
   */
  const toggleModal = () => {
    setModal(!modal);
  };

  /**
   * Handles changes in the patient form fields.
   * @param {Object} e - Event object containing the field id and value.
   */
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCurrentPatient((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  /**
   * Handles the submission of the updated patient.
   * Validates the patient data, updates the patient, and refreshes the patients list.
   */
  const handleSubmit = async () => {
    const currentErrors = await validation(currentPatient);
    setErrors(currentErrors);
    try {
      if (Object.keys(currentErrors).length === 0) {
        const patientToEdit = {
          id: currentPatient.id,
          firstName: currentPatient.firstName,
          lastName: currentPatient.lastName,
          ssn: currentPatient.ssn,
          email: currentPatient.email,
          street: currentPatient.street,
          city: currentPatient.city,
          state: currentPatient.state,
          zip: currentPatient.zip,
          age: currentPatient.age,
          height: currentPatient.height,
          weight: currentPatient.weight,
          gender: currentPatient.gender,
          insurance: currentPatient.insurance
        };
        await updatePatient(patientToEdit);
        setErrors({});
        onRefresh();
        setCurrentPatient({
          firstName: '',
          lastName: '',
          ssn: '',
          email: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          age: '',
          height: '',
          weight: '',
          gender: '',
          insurance: ''
        });
        toggleModal();
      }
    } catch (err) {
      setErrors(err.response ? err.response.data : err.message);
    }
  };

  /**
   * Retrieves the patient details by ID and prepares them for editing.
   * @param {string} id - ID of the patient to edit.
   */
  const handleUpdatePatient = async (id) => {
    try {
      const patientById = await getById(id);
      const samplePatient = {
        id: patientById.id,
        firstName: patientById.firstName,
        lastName: patientById.lastName,
        ssn: patientById.ssn,
        email: patientById.email,
        street: patientById.street,
        city: patientById.city,
        state: patientById.state,
        zip: patientById.zip,
        age: patientById.age,
        height: patientById.height,
        weight: patientById.weight,
        gender: patientById.gender,
        insurance: patientById.insurance
      };
      setCurrentPatient(samplePatient);
      toggleModal();
    } catch (err) {
      setErrors(err.message);
    }
  };

  /**
   * Cancels the current edit operation and closes the modal.
   */
  const handleCancel = () => {
    setCurrentPatient({});
    toggleModal();
    setErrors({});
  };

  // Adds 'active-modal' class to body when modal is open
  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <button type='button' className='edit-button' onClick={() => handleUpdatePatient(patient.id)}>
        Edit
      </button>
      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>UPDATE PATIENT FORM</h2>
            </div>
            <PatientForm
              fields={fields}
              patient={currentPatient}
              onChange={handleChange}
              error={errors}
            />
            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={handleCancel}>
                Cancel
              </button>
              <button type='submit' className='submit-close-modal' onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <div style={{ color: 'red', marginLeft: '10px', textAlign: 'left' }}>* required fields</div>
          </div>
        </div>
      )}
    </>
  );
}
