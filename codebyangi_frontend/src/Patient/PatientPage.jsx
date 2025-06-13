import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import './Component/Modal.css';
import PatientFields from './Component/PatientFields';
import NewPatientModal from './NewPatientModal';
import EditPatientModal from './EditPatientModal';
import DeletePatient from './DeletePatient';
import Validator from './Validator';
import SimpleTable, { createRow } from './Component/Table';
import { getAllPatients } from './apiServicePatient';

/**
 * PatientsPage Component
 *
 * This component displays a table of patients retrieved from the backend.
 * It manages CRUD operations for patients and utilizes the Table component for layout.
 * Errors during data fetching or CRUD operations are handled and displayed.
 *
 * @returns {JSX.Element} The PatientsPage component.
 */

export default function PatientPage() {
  // Array of fields for New Patient Modal.
  // Table columns configuration.
  const columns = [
    { id: 'Update', minWidth: 100 },
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'lastName', label: 'Last Name', minWidth: 100 },
    { id: 'age', label: 'Age', minWidth: 100 },
    { id: 'gender', label: 'Gender', minWidth: 100 },
    { id: 'Details', minWidth: 100 },
    { id: 'Delete', minWidth: 100 }
  ];

  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  /**
   * Fetches patients data from the backend API.
   * Sorts the data by ID and updates the patients state.
   */
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatients();
        data.sort((a, b) => (a.id > b.id ? 1 : -1));
        setPatients(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchPatients();
  }, [refresh]);

  /**
   * Toggles the refresh state to force a data refresh.
   */
  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  /**
   * Constructs table rows based on patients data.
   * Maps each patient to a table row with edit, view details and delete functionalities.
   */
  const rows = [];
  patients.map(
    (patient) => rows.push(
      createRow(
        columns,
        [<EditPatientModal
          fields={PatientFields}
          patient={patient}
          onRefresh={handleRefresh}
          validation={Validator}
        />,
        patient.firstName,
        patient.lastName,
        patient.age,
        patient.gender,
          <Link to={`/patients/${patient.id}`}>View Details</Link>,
          <DeletePatient patient={patient} onRefresh={handleRefresh} />
        ]
      )
    )
  );

  return (
    <div className='pages-table'>
      <div className='header-modal-container'>
        <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Patients</h1>
        <NewPatientModal
          fields={PatientFields}
          onRefresh={handleRefresh}
          validation={Validator}
        />
      </div>
      <SimpleTable columns={columns} rows={rows} />
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
}
