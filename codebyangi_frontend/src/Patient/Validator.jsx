import { getAllPatients } from './apiServicePatient';

/**
 * Checks if a value is blank:empty or just white spaces.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is blank, false otherwise.
 */
const isBlank = (value) => value === null || value === undefined || (typeof value === 'string' && value.trim() === '');

/**
 * Checks if a field value is unique across the database.
 *
 * @param {string} field - The field value to check.
 * @param {string} type - The type of field (e.g., 'ssn', 'email').
 * @param {string} [currentId=null] - The ID of the current patient (to exclude from check).
 * @returns {Promise<boolean>} True if the field value is unique, false otherwise.
 * @throws {Error} If there's an issue checking the uniqueness.
 */
const isFieldUnique = async (field, type, currentId = null) => {
  try {
    const patients = await getAllPatients();
    return !patients.some(
      (existingPatient) => existingPatient[type] === field && existingPatient.id !== currentId
    );
  } catch (err) {
    throw new Error(`Failed to check ${type} uniqueness.`);
  }
};

/**
 * Validates the fields for a patient form.
 *
 * @param {*} fields - the fields of a patient to validate
 * @returns {object} An object containing error messages for each invalid field.
 */
export default async function Validator(fields) {
  const errors = {};

  if (isBlank(fields.firstName)) {
    errors.firstName = 'First Name is required.';
  } else {
    if (!/^[a-zA-Z\-\s',.]*$/.test(fields.firstName)) {
      errors.firstName = 'First Name contains invalid characters.';
    }
    if (fields.firstName.length > 30) {
      errors.firstName = errors.firstName
        ? `${errors.firstName} First Name must be 30 characters or less.`
        : 'First Name must be 30 characters or less.';
    }
  }

  if (isBlank(fields.lastName)) {
    errors.lastName = 'Last Name is required.';
  } else {
    if (!/^[a-zA-Z\-\s',.]*$/.test(fields.lastName)) {
      errors.lastName = 'Last Name contains invalid characters.';
    }
    if (fields.lastName.length > 30) {
      errors.lastName = errors.lastName
        ? `${errors.lastName} Last Name must be 30 characters or less.`
        : 'Last Name must be 30 characters or less.';
    }
  }

  if (isBlank(fields.ssn)) {
    errors.ssn = 'SSN is required.';
  } else if (!/^\d{3}-\d{2}-\d{4}$/.test(fields.ssn)) {
    errors.ssn = 'SSN is not in the right format: DDD-DD-DDDD';
  } else {
    try {
      const ssnUnique = await isFieldUnique(fields.ssn, 'ssn', fields.id);

      if (!ssnUnique) {
        errors.ssn = 'SSN already exists in the database.';
      }
    } catch (err) {
      throw new Error('Failed to check field uniqueness.');
    }
  }

  if (isBlank(fields.email)) {
    errors.email = 'Email is required.';
  } else if (!/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(fields.email)) {
    errors.email = 'Email is not in the right format: x@x.x';
  } else {
    try {
      const emailUnique = await isFieldUnique(fields.email, 'email', fields.id);

      if (!emailUnique) {
        errors.email = 'Email already exists in the database.';
      }
    } catch (err) {
      throw new Error('Failed to check field uniqueness.');
    }
  }

  if (isBlank(fields.street)) {
    errors.street = 'Street is required.';
  } else {
    if (!/^[a-zA-Z0-9\-\s',.]*$/.test(fields.street)) {
      errors.street = 'Street contains invalid characters.';
    }
    if (fields.street.length > 30) {
      errors.street = errors.street
        ? `${errors.street} Street must be 30 characters or less.`
        : 'Street must be 30 characters or less.';
    }
  }

  if (isBlank(fields.city)) {
    errors.city = 'City is required.';
  } else {
    if (!/^[a-zA-Z\-\s',.]*$/.test(fields.city)) {
      errors.city = 'City contains invalid characters.';
    }
    if (fields.city.length > 30) {
      errors.city = errors.city
        ? `${errors.city} City must be 30 characters or less.`
        : 'City must be 30 characters or less.';
    }
  }

  if (isBlank(fields.state)) {
    errors.state = 'State is required.';
  }

  if (isBlank(fields.zip)) {
    errors.zip = 'Zipcode is required.';
  } else if (!/^\d{5}(?:-\d{4})?$/.test(fields.zip)) {
    errors.zip = 'Zipcode is not in the right numeric format: DDDDD or DDDDD-DDDD';
  }

  if (isBlank(fields.age)) {
    errors.age = 'Age is required.';
  } else {
    if (!Number.isInteger(Number(fields.age)) || fields.age < 0 || (!/^\d+$/.test(fields.age))) {
      errors.age = 'Age must be a positive integer.';
    }
    if (fields.age > 120) {
      errors.age = errors.age
        ? `${errors.age} Age cannot be greater than 120.`
        : 'Age cannot be greater than 120.';
    }
  }

  if (!isBlank(fields.height)) {
    if (!Number.isInteger(Number(fields.height)) || fields.height < 0 || (!/^\d+$/.test(fields.height))) {
      errors.height = 'Height must be a positive integer.';
    }
    if (fields.height > 108) {
      errors.height = errors.height
        ? `${errors.height} Height cannot be greater than 108 inches.`
        : 'Height cannot be greater than 108 inches.';
    }
  }

  if (!isBlank(fields.weight)) {
    if (!Number.isInteger(Number(fields.weight)) || fields.weight < 0 || (!/^\d+$/.test(fields.weight))) {
      errors.weight = 'Weight must be a positive integer.';
    }
    if (fields.weight > 1400) {
      errors.weight = errors.weight
        ? `${errors.weight} Weight cannot be greater than 1400 pounds.`
        : 'Weight cannot be greater than 1400 pounds.';
    }
  }

  if (isBlank(fields.gender)) {
    errors.gender = 'Gender is required.';
  }

  if (isBlank(fields.insurance)) {
    errors.insurance = 'Insurance is required.';
  } else {
    if (!/^[a-zA-Z\-\s',.]*$/.test(fields.insurance)) {
      errors.insurance = 'Insurance contains invalid characters.';
    }
    if (fields.insurance.length > 50) {
      errors.insurance = errors.insurance
        ? `${errors.insurance} Insurance must be 50 characters or less.`
        : 'Insurance must be 50 characters or less.';
    }
  }
  return errors;
}
