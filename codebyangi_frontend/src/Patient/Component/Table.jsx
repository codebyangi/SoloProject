import * as React from 'react';
import './Table.css';

/**
 * Creates a row object from the given columns and values.
 *
 * @param {Array} columns - The columns for the row.
 * @param {Array} values - The values for the row.
 * @param {string|number} id - Unique id for the row.
 * @returns {Object} A row object.
 */
export function createRow(columns, values, id) {
  const row = { id };
  columns.forEach((column, index) => {
    row[column.id] = values[index];
  });
  return row;
}

/**
 * SimpleTable component renders a basic HTML table.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.columns - The columns to be displayed in the table.
 * @param {Array} props.rows - The rows to be displayed in the table.
 *
 * @returns {JSX.Element} A React component that renders a simple table.
 */
export default function SimpleTable({ columns, rows }) {
  return (
    <div className='table-container'>
      <table className='simple-table'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id} style={{ minWidth: column.minWidth, textAlign: 'center' }}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {columns.map((column) => (
                <td key={column.id} style={{ textAlign: 'center' }}>
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
