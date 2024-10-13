const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
// const pdfRoutes = require('./routes/pdfRoutes');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes (should be defined first to avoid conflict with frontend)
// app.use('/api', pdfRoutes);

// Serve static files from the React frontend app
//app.use(express.static(path.join(__dirname, '../frontend/build')));

// Anything that doesn't match the API routes should serve the React frontend
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
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
