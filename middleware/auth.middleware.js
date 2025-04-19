const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyUser = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];  // Bearer <token>

  if (!token) {
    return res.status(403).json({ msg: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Save user info to request object
    console.log(req.user+"@@@");
    next();
  } catch (err) {
    return res.status(400).json({ msg: 'Invalid token' });
  }
};

// Verify if the user is a Manager (for manager-only routes)
const verifyManager = (req, res, next) => {
  if (req.user.role !== 'MANAGER') {
    return res.status(403).json({ msg: 'Access denied, manager role required' });
  }
  next();
};

module.exports = { verifyUser, verifyManager };
