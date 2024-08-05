import mongoose from 'mongoose';
import employeeHistorySchema from './employeeHistory.model.js';
import coordinatesSchema from './coordinates.model.js';

const { Schema } = mongoose;

// Define the main employee schema
const employeeSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  employeeName: {
    type: String,
    required: true
  },
  employeeAddress: {
    type: String,
    required: true
  },
  employeeAge: {
    type: Number,
    required: true
  },
  employeeDepartment: {
    type: String,
    required: true
  },
  employeeStatus: {
    type: String,
    enum: ['RemoteLocation', 'ContractEmployee', 'Full-Time'],
    required: true
  },
  coordinates: {
    type: coordinatesSchema,
    required: true
  },
  history: [employeeHistorySchema] // Add the history field as an array of employeeHistorySchema
}, {
  timestamps: true
});

// Creating the Employee model
const Employee = mongoose.model('Employee', employeeSchema, 'employee');

// Exporting the Employee schema model
export default Employee;