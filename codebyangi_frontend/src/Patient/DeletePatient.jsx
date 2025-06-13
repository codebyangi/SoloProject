import React, { useState } from 'react';
import './Component/Modal.css';
import { deletePatient } from './apiServicePatient';
/**
 * Component for deleting a patient.
 * @param {Object} props - Component props.
 * @param {Object} props.patient - The patient object to delete.
 * @param {Function} props.onRefresh - Function to refresh the patients list after deletion.
 * @returns {JSX.Element} Delete button and error message display.
 */
export default function DeletePatient({ patient, onRefresh }) {
  const [error, setError] = useState(null);

  /**
   * Handles the deletion of the patient.
   * Calls the deletePatient API function and refreshes the list on success.
   * Sets an error message on failure.
   */
  const handleDeletePatient = async () => {
    try {
      await deletePatient(patient.id);
      onRefresh();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <button type='button' className='delete-button' onClick={() => handleDeletePatient(patient.id)}>
        Delete
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}
