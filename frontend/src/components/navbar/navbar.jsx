import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CreateEmployeeModal from '../../components/createEmployeeModal/createEmployeeModal';
import { addEmployee } from '../../Redux/employeeSlice';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCreateEmployee = (employee) => {
    const userId = localStorage.getItem('userId');
    const employeeData = { ...employee, userId };

    dispatch(addEmployee(employeeData))
      .unwrap()
      .then(() => {
        console.log('Employee created successfully');
        closeModal();
      })
      .catch((error) => {
        console.error('Failed to create employee:', error);
      });
  };

  return (
    <div className='navbar'>
      <div className='user-name navbar-reduced'>
        Hello {localStorage.getItem('userName')}!
      </div>
      <div className='navbar-name'>
        SETTYL
      </div>
      <div className='nav-items'>
        <button onClick={openModal} className='create-employee-button'>Create Employee</button>
        <div className='navbar-logout' onClick={handleLogout}>
          Logout
        </div>
      </div>
      <CreateEmployeeModal 
        modalIsOpen={modalIsOpen} 
        closeModal={closeModal} 
        onSubmit={handleCreateEmployee} 
      />
    </div>
  );
};

export default Navbar;