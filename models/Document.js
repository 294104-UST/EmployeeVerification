const mongoose = require('mongoose');
const User = require('../models/User'); 
const DocumentSchema = new mongoose.Schema({
  documentNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['AADHAR', 'PAN', 'ADDRESS_PROOF', 'QUALIFICATION'],
    required: true
  },
  fileUrl: {
    type: String,
    required: true  // URL where the file is stored (e.g., local or S3)
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    requried:true
  },
  verifiedStatus: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    
  },
  comment: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);
