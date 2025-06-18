import React from 'react';
import {
  BrowserRouter as Router, Route, Routes, Navigate
} from 'react-router-dom';
import Header from './Patient/Component/Header';
import PatientPage from './Patient/PatientPage';
import PatientDetailsPage from './Patient/PatientDetailsPage';

/**
 * App component serves as the main entry point for the application.
 *
 * @component
 * @returns {JSX.Element} A React component representing the main
 * application with link to Patients and Patient details page.
 */

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Navigate to='/patients' replace />} />
          <Route path='/patients' element={<PatientPage />} />
          <Route path='/patients/:id' element={<PatientDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
