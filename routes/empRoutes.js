const express = require('express');
const employeeController = require('../controller/employeeController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, employeeController.getAllEmployees)
  .post(authController.protect, employeeController.addEmployee);

router
  .route('/:id')
  .get(authController.protect, employeeController.getEmployeeUsingId)
  .patch(authController.protect, employeeController.updateEmployee)
  .delete(authController.protect, employeeController.deleteEmployee);

module.exports = router;
