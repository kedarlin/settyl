import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/navbar/navbar';
import EmployeeModal from '../../components/employeeModal/employeeModal';
import { fetchEmployees } from '../../Redux/employeeSlice';
import './record.css';

const Record = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.items);
  const employeeStatus = useSelector((state) => state.employees.status);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (employeeStatus === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [employeeStatus, dispatch]);

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
          {employees.map((employee) => (
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

      <EmployeeModal 
        modalIsOpen={modalIsOpen} 
        closeModal={closeModal} 
        selectedEmployee={selectedEmployee} 
      />
    </div>
  );
};

export default Record;