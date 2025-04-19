const multer = require('multer');
const Document = require('../models/Document');
const path = require('path');
const Employee = require('../models/Employee'); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// const uploadDocument = async (req, res) => {
//   const { type, documentNumber } = req.body;
//   const uploadedBy = req.user.id;  // Assuming JWT auth middleware provides user ID

//   try {
//     const newDocument = new Document({
//       type,
//       documentNumber,
//       fileUrl: req.file.path,  // Path to the uploaded file
//       uploadedBy
//     });

//     await newDocument.save();
//     res.status(201).json(newDocument);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };
const uploadDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const { type, documentNumber } = req.body;
  const uploadedBy = req.user ? req.user.id : null;  // Assuming req.user.id is the Employee ID from JWT
  console.log(uploadedBy+"%%%");
  // Check if the user exists in the Employee collection
  const employee = await Employee.findById(uploadedBy);
  if (!employee) {
    return res.status(400).json({ msg: 'Employee not found' });
  }

  try {
    // Create new document
    const newDocument = new Document({
      type,
      documentNumber,
      fileUrl: req.file.path,  // File path of the uploaded document
      uploadedBy: employee._id  // Use Employee ID from the Employee model
    });

    // Save the document
    await newDocument.save();

    // Populate the 'uploadedBy' field with the corresponding employee data (optional)
    const populatedDocument = await Document.findById(newDocument._id).populate('uploadedBy');

    // Return the populated document
    res.status(201).json(populatedDocument);

  } catch (err) {
    console.error('Error during document upload:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

module.exports = { uploadDocument, upload };
