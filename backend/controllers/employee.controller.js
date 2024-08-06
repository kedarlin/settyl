import Employee from '../models/employee.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import { fetchCoordinates } from './fetchCoordinates.controller.js';

// Creating a new employee
export const createEmployee = async (req, res, next) => {
  try {
    const { userId, employeeName, employeeAddress, employeeAge, employeeDepartment, employeeStatus, cityPlace } = req.body;
    // console.log(req.body);
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const coordinates = await fetchCoordinates(cityPlace);

    const employee = new Employee({
      employeeName,
      employeeAddress,
      employeeAge,
      employeeDepartment,
      employeeStatus,
      coordinates
    });
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
    const employees = await Employee.find({}, '-history'); // Exclude history field
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
// Updating an employee by ID
export const updateEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const { employeeName, employeeAddress, employeeAge, employeeDepartment, employeeStatus } = req.body;

    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return next(errorHandler(404, 'Employee not found'));
    }

    // Create a history entry
    const historyEntry = {
      employeeName: employee.employeeName,
      employeeAddress: employee.employeeAddress,
      employeeAge: employee.employeeAge,
      employeeDepartment: employee.employeeDepartment,
      employeeStatus: employee.employeeStatus,
      coordinates: employee.coordinates,
      changedAt: new Date(),
    };
    employee.history.push(historyEntry); // Add the history entry to the history array

    // Update the employee properties
    employee.employeeName = employeeName || employee.employeeName;
    employee.employeeAddress = employeeAddress || employee.employeeAddress;
    employee.employeeAge = employeeAge || employee.employeeAge;
    employee.employeeDepartment = employeeDepartment || employee.employeeDepartment;
    employee.employeeStatus = employeeStatus || employee.employeeStatus;

    await employee.save();
    res.status(200).json(employee);
  } catch (error) {
    console.log('Error in updating employee:', error.message);
    next(errorHandler(400, error.message));
  }
};

// Deleting an employee by ID
export const deleteEmployee = async (req, res, next) => {
  try {
    console.log(req.params.employeeId);
    await Employee.findOneAndDelete({"employeeId" : req.params.employeeId});
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.log("Error in deleting employee:", error.message);
    next(errorHandler(500, error.message));
  }
};