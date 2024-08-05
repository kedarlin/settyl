import { useState } from 'react';
import Modal from 'react-modal';
import Navbar from "../../components/navbar/navbar";
import "./record.css";

// Bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const sampleEmployees = [
  { employeeId: '1', employeeName: 'John Doe', employeeAddress: '123 Main St, Anytown, USA', employeeAge: 30, employeeDepartment: 'Engineering', employeeStatus: 'Full-Time', coordinates: { lat: 37.7749, lon: -122.4194 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  { employeeId: '2', employeeName: 'Jane Smith', employeeAddress: '456 Oak St, Anytown, USA', employeeAge: 25, employeeDepartment: 'Marketing', employeeStatus: 'ContractEmployee', coordinates: { lat: 40.7128, lon: -74.0060 } },
  // Add more sample data as needed
];

const Record = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="record">
      <Navbar />
      <h2 className="record-title">Employee Records</h2>
      <table className="record-table">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Employee Address</th>
            <th>Employee Age</th>
            <th>Employee Department</th>
            <th>Employee Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleEmployees.map((employee) => (
            <tr key={employee.employeeId} onClick={() => openModal(employee)}>
              <td>{employee.employeeId}</td>
              <td>{employee.employeeName}</td>
              <td>{employee.employeeAddress}</td>
              <td>{employee.employeeAge}</td>
              <td>{employee.employeeDepartment}</td>
              <td>{employee.employeeStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </div>
  );
};

export default Record;