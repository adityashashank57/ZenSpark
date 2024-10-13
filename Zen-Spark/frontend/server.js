const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const pdfRoutes = require('./routes/pdfRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Backend API routes
app.use('/api', pdfRoutes);

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch all other routes and return the React app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log('MongoDB connected');
      app.listen(process.env.PORT || 5000, () => {
          console.log(`Server running on port ${process.env.PORT || 5000}`);
      });
  })
  .catch((error) => console.error('Failed to connect to MongoDB:', error));
