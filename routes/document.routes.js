const express = require('express');
const { uploadDocument } = require('../controllers/document.controller');
const { upload } = require('../controllers/document.controller');
const router = express.Router();

// Upload document
router.post('/upload', upload.single('document'), uploadDocument);

module.exports = router;
