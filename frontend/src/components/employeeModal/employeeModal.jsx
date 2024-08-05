/* eslint-disable react/prop-types */
// components/EmployeeModal.jsx
import Modal from 'react-modal';
import './employeeModal.css'; // You can create this CSS file for modal-specific styles

const EmployeeModal = ({ modalIsOpen, closeModal, selectedEmployee }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Employee Details"
      className="modal"
      overlayClassName="modal-overlay"
    >
      {selectedEmployee && (
        <div className="modal-content">
          <h2>Employee Details</h2>
          <p><strong>Employee Id:</strong> {selectedEmployee.employeeId}</p>
          <p><strong>Employee Name:</strong> {selectedEmployee.employeeName}</p>
          <p><strong>Employee Address:</strong> {selectedEmployee.employeeAddress}</p>
          <p><strong>Employee Age:</strong> {selectedEmployee.employeeAge}</p>
          <p><strong>Employee Department:</strong> {selectedEmployee.employeeDepartment}</p>
          <p><strong>Employee Status:</strong> {selectedEmployee.employeeStatus}</p>
          <p><strong>Coordinates:</strong> {`Lat: ${selectedEmployee.coordinates.lat}, Lon: ${selectedEmployee.coordinates.lon}`}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </Modal>
  );
};

export default EmployeeModal;