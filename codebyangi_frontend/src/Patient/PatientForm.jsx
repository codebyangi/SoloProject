import React from 'react';
import './Component/Modal.css';
import InputField from './Component/InputField';

/**
 * PatientForm component for rendering a form with
 * input fields based on provided fields configuration.
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.fields - Array of field configurations for the patient form.
 * @param {Function} props.onChange - Function to handle changes in any input field.
 * @param {Object} props.patient - Object containing current patient data.
 * @param {Object} props.error - Object containing error messages for each field, keyed by field ID.
 * @returns {JSX.Element} Patient form component.
 */
export default function PatientForm({
  fields, onChange, patient, error
}) {
  /**
   * Handles clearing the value of a specific field.
   * @param {string} fieldId - ID of the field to clear.
   */
  const handleClear = (fieldId) => {
    const event = {
      target: {
        id: fieldId,
        value: ''
      }
    };
    onChange(event);
  };

  return (
    <form style={{ paddingBottom: '5%' }} className='input-container'>
      {fields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          label={field.label}
          value={field.keys.split('.').reduce((o, i) => o[i], patient)}
          onChange={onChange}
          onClear={handleClear}
          required={field.required}
          error={error[field.id]}
        />
      ))}
    </form>
  );
}
