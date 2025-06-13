const PatientFields = [
  {
    id: 'firstName', label: 'First Name', keys: 'firstName', required: true
  },
  {
    id: 'lastName', label: 'Last Name', keys: 'lastName', required: true
  },
  {
    id: 'ssn', label: 'SSN', keys: 'ssn', required: true
  },
  {
    id: 'email', label: 'Email', keys: 'email', required: true
  },
  {
    id: 'street', label: 'Street', keys: 'street', required: true
  },
  {
    id: 'city', label: 'City', keys: 'city', required: true
  },
  {
    id: 'state', label: 'State', keys: 'state', required: true
  },
  {
    id: 'zip', label: 'Zipcode', keys: 'zip', required: true
  },
  {
    id: 'age', label: 'Age', keys: 'age', required: true
  },
  {
    id: 'gender', label: 'Gender', keys: 'gender', required: true
  },
  {
    id: 'height', label: 'Height (in)', keys: 'height', required: false
  },
  {
    id: 'weight', label: 'Weight (lb)', keys: 'weight', required: false
  },
  {
    id: 'insurance', label: 'Insurance', keys: 'insurance', gridNum: 1, required: true
  }
];
export default PatientFields;
