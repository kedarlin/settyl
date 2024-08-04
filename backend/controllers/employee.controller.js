import Employee from '../models/employee.model.js';
import { errorHandler } from '../utils/error.js';

// Creating a new employee
export const createEmployee = async (req, res, next) => {
  try {
    const { employeeName, employeeAddress, employeeAge, employeeDepartment, employeeStatus } = req.body;

    if (!employeeName || !employeeAddress || !employeeAge || !employeeDepartment || !employeeStatus) {
      return next(errorHandler(400, 'All fields are required'));
    }

    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.log("Error in creating employee:", error.message);
    next(errorHandler(400, error.message));
  }
};

// Get all employees
export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.log("Error in getting all employees:", error.message);
    next(errorHandler(500, error.message));
  }
};

// Get a single employee by ID
export const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return next(errorHandler(404, 'Employee not found'));
    }
    res.status(200).json(employee);
  } catch (error) {
    console.log("Error in getting single employee:", error.message);
    next(errorHandler(500, error.message));
  }
};

// Updating an employee by ID
export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return next(errorHandler(404, 'Employee not found'));
    }

    // Push the current state to the history array
    employee.history.push({
      employeeName: employee.employeeName,
      employeeAddress: employee.employeeAddress,
      employeeAge: employee.employeeAge,
      employeeDepartment: employee.employeeDepartment,
      employeeStatus: employee.employeeStatus
    });

    // Update employee properties
    Object.assign(employee, req.body);
    await employee.save();
    res.status(200).json(employee);
  } catch (error) {
    console.log("Error in updating employee:", error.message);
    next(errorHandler(400, error.message));
  }
};

// Deleting an employee by ID
export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return next(errorHandler(404, 'Employee not found'));
    }
    await employee.remove();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.log("Error in deleting employee:", error.message);
    next(errorHandler(500, error.message));
  }
};