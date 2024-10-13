
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const pdfRoutes = require('./routes/pdfRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Test Route to Check Backend
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// API Routes (should be defined first to avoid conflict with frontend)
app.use('/api', pdfRoutes);

// // Serve Static Files (React Frontend)
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// // Catch-all Route to Serve React App (when no API routes match)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

console.log('MONGO_URI:', process.env.MONGO_URI);  // Verify MONGO_URI is being loaded

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.error('Failed to connect to MongoDB:', error));