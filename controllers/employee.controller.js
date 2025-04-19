const Employee = require('../models/Employee');
const Document = require('../models/Document');

const createEmployeeProfile = async (req, res) => {
  const { employeeId, name, address, yearsOfExperience, previousCompanies, aadharNumber, panNumber } = req.body;

  try {
    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ employeeId });
    if (existingEmployee) {
      return res.status(400).json({ msg: 'Employee already exists' });
    }

    // Create new employee
    const newEmployee = new Employee({
      employeeId,
      name,
      address,
      yearsOfExperience,
      previousCompanies,
      aadharNumber,
      panNumber
    });
    
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get employee profile
const getEmployeeProfile = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const employee = await Employee.findOne({ employeeId }).populate('addressProofId qualificationCertificateId');
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { createEmployeeProfile, getEmployeeProfile };
