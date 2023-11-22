require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// Removed bodyParser as express.json() is used
const characterRoutes = require('./src/routes/characterRoutes');
const connectDB = require('./src/config/db');

connectDB();

const app = express();

app.use(express.json()); // Using built-in express.json() middleware
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/characters', characterRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
});

// Catch-all route for unmatched requests
app.use((req, res) => {
  res.status(404).send('Page not found');
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}`);
});
