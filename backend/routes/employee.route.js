import express from 'express';
import { 
  createEmployee, 
  getEmployee, 
  getEmployees, 
  updateEmployee, 
  deleteEmployee 
} from '../controllers/employee.controller.js';

const router = express.Router();

// Create a new employee
router.post('/', createEmployee);

// Get all employees
router.get('/', getEmployees);

// Get a single employee by ID
router.get('/:employeeId', getEmployee);

// Update an employee by ID
router.put('/:employeeId', updateEmployee);

// Delete an employee by ID
router.delete('/:employeeId', deleteEmployee);

export default router;