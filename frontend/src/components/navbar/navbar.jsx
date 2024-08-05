import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateEmployeeModal from '../../components/createEmployeeModal/createEmployeeModal';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
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
    console.log('Creating employee:', employee);
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