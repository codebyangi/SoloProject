import React from 'react';
import './Modal.css';

const stateAbbreviations = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
];
const genderOption = [
  'Male',
  'Female',
  'Other'
];
/**
 * InputField component for rendering an input field with label and optional error message.
 * @param {Object} props - Component props.
 * @param {string} props.id - The ID of the input field.
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {Function} props.onChange - Function to handle input field changes.
 * @param {boolean} props.required - Flag indicating if the input field is required.
 * @param {string} props.error - Error message to display for the input field, if any.
 * @returns {JSX.Element} Input field component.
 */

export default function InputField({
  id, label, value, onChange, required, error
}) {
  /**
   * Renders a required indicator if the field is mandatory.
   * @returns {JSX.Element|null} Required indicator span element or null.
   */
  const renderRequired = () => {
    if (required) {
      return <span style={{ color: 'red' }}> *</span>;
    }
    return null;
  };

  const gridStyle = { gridColumn: 'span 2' };
  if (id === 'state') {
    return (
      <div className={`input-field ${id}`} style={gridStyle}>
        <label htmlFor={id}>
          {label}:{renderRequired()}
        </label>
        <select className='input-flex' id={id} value={value} onChange={onChange}>
          <option value=''>Select State</option>
          {stateAbbreviations.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }
  if (id === 'gender') {
    return (
      <div className={`input-field ${id}`} style={gridStyle}>
        <label htmlFor={id}>
          {label}:{renderRequired()}
        </label>
        <select className='input-flex' id={id} value={value} onChange={onChange}>
          <option value=''>Select Gender</option>
          {genderOption.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }
  return (
    <div className={`input-field ${id}`} style={gridStyle}>
      <label htmlFor={id}>
        {label}:{renderRequired()}
      </label>
      <input
        className='input-flex'
        id={id}
        type='text'
        value={value}
        onChange={onChange}
        style={{ position: 'relative' }}
      />
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
}
