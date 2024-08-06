/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import "./employeeModal.css";
import { GrUpdate } from "react-icons/gr";
import { FaTrash } from "react-icons/fa6";
import UpdateEmployeeModal from "../updateEmployeeModal/updateEmployeeModal"; // Import the new UpdateEmployeeModal component
import { updateEmployee, deleteEmployee } from "../../Redux/employeeSlice"; // Import the update and delete actions

const EmployeeModal = ({ modalIsOpen, closeModal, selectedEmployee }) => {
  const dispatch = useDispatch();
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  const openUpdateModal = () => {
    console.log("Update modal opened"); // Debug log
    setUpdateModalIsOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const handleUpdate = (updatedEmployee) => {
    dispatch(updateEmployee({ employeeId: updatedEmployee.employeeId, employeeData: updatedEmployee }))
      .unwrap()
      .then(() => {
        console.log("Employee updated successfully");
        closeUpdateModal();
        closeModal();
      })
      .catch((error) => {
        console.error("Failed to update employee:", error);
      });
  };

  const handleDelete = () => {
    dispatch(deleteEmployee(selectedEmployee.employeeId))
      .unwrap()
      .then(() => {
        console.log("Employee deleted successfully");
        closeModal();
      })
      .catch((error) => {
        console.error("Failed to delete employee:", error);
      });
  };

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
          <div className="modal-head">
            <h2>Employee Details</h2>
            <div className="modal-oper">
              <div className="modal-update" onClick={openUpdateModal}>
                <p>Update</p>
                <GrUpdate className="modal-icons" />
              </div>
              <div className="modal-delete" onClick={handleDelete}>
                <p>Delete</p>
                <FaTrash className="modal-icons" />
              </div>
            </div>
          </div>
          <p>
            <strong>Employee Id:</strong> {selectedEmployee.employeeId}
          </p>
          <p>
            <strong>Employee Name:</strong> {selectedEmployee.employeeName}
          </p>
          <p>
            <strong>Employee Address:</strong> {selectedEmployee.employeeAddress}
          </p>
          <p>
            <strong>Employee Age:</strong> {selectedEmployee.employeeAge}
          </p>
          <p>
            <strong>Employee Department:</strong> {selectedEmployee.employeeDepartment}
          </p>
          <p>
            <strong>Employee Status:</strong> {selectedEmployee.employeeStatus}
          </p>
          <p>
            <strong>Coordinates:</strong> {`Lat: ${selectedEmployee.coordinates.lat}, Lon: ${selectedEmployee.coordinates.lon}`}
          </p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
      <UpdateEmployeeModal
        modalIsOpen={updateModalIsOpen}
        closeModal={closeUpdateModal}
        onSubmit={handleUpdate}
        employee={selectedEmployee}
      />
    </Modal>
  );
};

export default EmployeeModal;