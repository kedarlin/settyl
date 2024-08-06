/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./updateEmployeeModal.css";

const UpdateEmployeeModal = ({ modalIsOpen, closeModal, onSubmit, employee }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState(employee);
  const [error, setError] = useState('');

  useEffect(() => {
    setUpdatedEmployee(employee);
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updatedEmployee.employeeName || !updatedEmployee.employeeAddress || !updatedEmployee.employeeAge || !updatedEmployee.employeeDepartment || !updatedEmployee.employeeStatus) {
      setError('All fields are required');
    } else {
      onSubmit(updatedEmployee);
      setError('');
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Update Employee"
      className="update-modal"
      overlayClassName="update-modal-overlay"
    >
      <div className="update-modal-content">
        <div className="update-modal-head">
          <h2>Update Employee</h2>
        </div>
        <form onSubmit={handleSubmit} className="update-modal-form">
          {error && <div className="update-modal-error">{error}</div>}
          <input
            type="text"
            name="employeeId"
            placeholder="Employee Id"
            value={updatedEmployee.employeeId}
            disabled
          />
          <input
            type="text"
            name="employeeName"
            placeholder="Employee Name"
            value={updatedEmployee.employeeName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="employeeAddress"
            placeholder="Employee Address"
            value={updatedEmployee.employeeAddress}
            onChange={handleChange}
          />
          <input
            type="text"
            name="employeeAge"
            placeholder="Employee Age"
            value={updatedEmployee.employeeAge}
            onChange={handleChange}
          />
          <input
            type="text"
            name="employeeDepartment"
            placeholder="Employee Department"
            value={updatedEmployee.employeeDepartment}
            onChange={handleChange}
          />
          <select
            name="employeeStatus"
            value={updatedEmployee.employeeStatus}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Full-Time">Full-Time</option>
            <option value="ContractEmployee">ContractEmployee</option>
            <option value="RemoteLocation">RemoteLocation</option>
          </select>
          <div className="update-modal-form-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={closeModal} className="close-button">
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateEmployeeModal;