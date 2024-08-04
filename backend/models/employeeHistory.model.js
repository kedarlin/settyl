import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define a schema for employee history
const employeeHistorySchema = new Schema({
  employeeName: String,
  employeeAddress: String,
  employeeAge: Number,
  employeeDepartment: String,
  employeeStatus: {
    type: String,
    enum: ['RemoteLocation', 'ContractEmployee', 'Full-Time']
  },
  changedAt: {
    type: Date,
    default: Date.now
  }
}, {
  _id: false // Disable automatic creation of _id for sub-documents
});

// Exporting the Employee History Schema
export default employeeHistorySchema;