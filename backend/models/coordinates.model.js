import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the coordinates schema
const coordinatesSchema = new Schema({
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  }
});

// Export the coordinates schema
export default coordinatesSchema;