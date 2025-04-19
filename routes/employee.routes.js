const express = require('express');
const { createEmployeeProfile, getEmployeeProfile } = require('../controllers/employee.controller');
const router = express.Router();

// Create employee profile
router.post('/', createEmployeeProfile);

// Get employee profile
router.get('/:employeeId', getEmployeeProfile);

module.exports = router;
