const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');
const documentRoutes = require('./routes/document.routes');
const verificationRoutes = require('./routes/verification.routes');
const authMiddleware = require('./middleware/auth.middleware');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse JSON requests
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve uploaded files

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', authMiddleware.verifyUser, employeeRoutes);
app.use('/api/documents', authMiddleware.verifyUser, documentRoutes);
app.use('/api/verify', authMiddleware.verifyManager, verificationRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
