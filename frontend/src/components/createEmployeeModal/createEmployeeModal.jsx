/* eslint-disable react/prop-types */
// components/CreateEmployeeModal.jsx
import { useState } from 'react';
import Modal from 'react-modal';
import './createEmployeeModal.css'; // You can create this CSS file for modal-specific styles

Modal.setAppElement('#root');

const CreateEmployeeModal = ({ modalIsOpen, closeModal, onSubmit }) => {
  const [employee, setEmployee] = useState({
    employeeId: '',
    employeeName: '',
    employeeAddress: '',
    employeeAge: '',
    employeeDepartment: '',
    employeeStatus: '',
    cityPlace: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employee.employeeName || !employee.employeeAddress || !employee.employeeAge || !employee.employeeDepartment || !employee.employeeStatus) {
      setError('All fields are required');
    } else {
      onSubmit(employee);
      setError('');
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Create Employee"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        {error && <div className="modal-error">{error}</div>}
        <input type="text" name="employeeName" placeholder="Employee Name" value={employee.employeeName} onChange={handleChange} />
        <input type="text" name="employeeAddress" placeholder="Employee Address" value={employee.employeeAddress} onChange={handleChange} />
        <input type="number" name="employeeAge" placeholder="Employee Age" value={employee.employeeAge} onChange={handleChange} />
        <input type="text" name="employeeDepartment" placeholder="Employee Department" value={employee.employeeDepartment} onChange={handleChange} />
        <select name="employeeStatus" value={employee.employeeStatus} onChange={handleChange}>
          <option value="">Select Status</option>
          <option value="RemoteLocation">RemoteLocation</option>
          <option value="ContractEmployee">ContractEmployee</option>
          <option value="Full-Time">Full-Time</option>
        </select>
        <input type="text" name="cityPlace" placeholder="Employee City Place" value={employee.cityPlace} onChange={handleChange} />
        <button type="submit">Submit</button>
        <button type="button" onClick={closeModal}>Close</button>
      </form>
    </Modal>
  );
};

export default CreateEmployeeModal;