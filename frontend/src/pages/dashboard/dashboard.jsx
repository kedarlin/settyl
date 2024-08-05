import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/navbar/navbar';
import { fetchEmployees } from '../../Redux/employeeSlice';
import './dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.items);
  const employeeStatus = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);

  useEffect(() => {
    if (employeeStatus === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [employeeStatus, dispatch]);

  return (
    <div className='dashboard'>
      <Navbar />
      <h2 className='dashboard-title'>Dashboard</h2>
      {employeeStatus === 'loading' && <div>Loading...</div>}
      {employeeStatus === 'failed' && <div>{error}</div>}
      <ul className='employee-list'>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.employeeName} - {employee.employeeDepartment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;