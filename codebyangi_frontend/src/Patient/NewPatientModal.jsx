import React, { useState } from 'react';
import './Component/Modal.css';
import PatientForm from './PatientForm';
import { createPatient } from './apiServicePatient';

/**
 * Component for creating a new patient using a modal.
 * @param {Object} props - Component props.
 * @param {Object} props.fields - Fields configuration for the patient form.
 * @param {Function} props.onRefresh - Function to refresh the list after creating new patient.
 * @param {Function} props.validation - Function to validate the patient data.
 * @returns {JSX.Element} Create button and modal for creating new patient.
 */
export default function NewPatientModal({ fields, onRefresh, validation }) {
  const [modal, setModal] = useState(false);
  const [patient, setPatient] = useState({
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
    setPatient((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  /**
   * Handles the submission of the new patient.
   * Validates the patient data, creates a new patient, and refreshes the patients list.
   */
  const handleSubmit = async () => {
    const currentErrors = await validation(patient);
    setErrors(currentErrors);
    try {
      if (Object.keys(currentErrors).length === 0) {
        const patientToCreate = {
          firstName: patient.firstName,
          lastName: patient.lastName,
          ssn: patient.ssn,
          email: patient.email,
          street: patient.street,
          city: patient.city,
          state: patient.state,
          zip: patient.zip,
          age: patient.age,
          height: patient.height,
          weight: patient.weight,
          gender: patient.gender,
          insurance: patient.insurance
        };
        await createPatient(patientToCreate);
        setErrors({});
        onRefresh();
        setPatient({
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
   * Cancels the current creation of the patient and closes the modal.
   */
  const handleCancel = () => {
    setPatient({});
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
      <button type='button' onClick={toggleModal} className='btn-modal'>
        <strong>Create Patient</strong>
      </button>
      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>NEW PATIENT FORM</h2>
            </div>
            <PatientForm
              fields={fields}
              patient={patient}
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
