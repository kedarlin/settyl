import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true // Add timestamps to track creation and update times
});

// Creating User Schema
const User = mongoose.model('User', userSchema, 'user');

// Exporting User Schema Model
export default User;