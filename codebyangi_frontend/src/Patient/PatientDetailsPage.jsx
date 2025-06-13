import React, { useEffect, useState } from 'react';
import './Component/Modal.css';
import { useParams } from 'react-router-dom';
import { getById } from './apiServicePatient';

/**
 * PatientDetailsPage component displays details of a specific patient.
 * @returns {JSX.Element} Patient details component.
 */
export default function PatientDetailsPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * Fetches patient details from API based on ID.
     * Sets patient state upon successful fetch.
     * Sets error state if fetch fails.
     */
    const fetchPatient = async () => {
      try {
        const patientById = await getById(id);
        const samplePatient = {
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
        setPatient(samplePatient);
      } catch (err) {
        setError(err);
      }
    };
    fetchPatient();
  }, [id]);

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error.message}</p>;
  }

  return (
    <div className='details'>
      <h2>Patient Details</h2>
      <table>
        <tbody>
          <tr><td><strong>First Name :</strong></td><td>{patient.firstName}</td></tr>
          <tr><td><strong>Last Name :</strong></td><td>{patient.lastName}</td></tr>
          <tr><td><strong>SSN :</strong></td><td>{patient.ssn}</td></tr>
          <tr><td><strong>Email :</strong></td><td>{patient.email}</td></tr>
          <tr><td><strong>Street :</strong></td><td>{patient.street}</td></tr>
          <tr><td><strong>City :</strong></td><td>{patient.city}</td></tr>
          <tr><td><strong>State :</strong></td><td>{patient.state}</td></tr>
          <tr><td><strong>Zipcode :</strong></td><td>{patient.zip}</td></tr>
          <tr><td><strong>Age (years) :</strong></td><td>{patient.age}</td></tr>
          <tr><td><strong>Height (in) :</strong></td><td>{patient.height}</td></tr>
          <tr><td><strong>Weight (lb) :</strong></td><td>{patient.weight}</td></tr>
          <tr><td><strong>Gender :</strong></td><td>{patient.gender}</td></tr>
          <tr><td><strong>Insurance :</strong></td><td>{patient.insurance}</td></tr>
        </tbody>
      </table>
    </div>
  );
}
