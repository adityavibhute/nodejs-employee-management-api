const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Employee must have name'],
  },
  email: {
    type: String,
    required: [true, 'A Employee must have email'],
    unique: true
  },
  address: {
    type: String,
    default: "Hinjewadi, Pune"
  },
  mobile: {
    type: Number,
    required: [true, 'Mobile number is mandatory'],
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
