const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

  
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  ID: {
    type: String,
    required: true,
    trim: true,
  },
  Designation: {
    type: String,
    required: true,
  }, 
  Salary: {
    type: String,
    required: true,
  }, 
  Department: {
    type: String,
    required: true,
  }, 
  Location: {
    type: String,
    required: true,
  }, 
});

module.exports = mongoose.model('employeeModel', employeeSchema); 
