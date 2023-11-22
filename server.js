require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const storyRoutes = require('./src/routes/storyRoutes');
const optionRoutes = require('./src/routes/optionRoutes');
const characterRoutes = require('./src/routes/characterRoutes');
require('dotenv').config();
const connectDB = require('./src/config/db');

connectDB();

const app = express();

// Middleware for parsing JSON bodies
// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/story', storyRoutes);
app.use('/api/continue', storyRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/characters', characterRoutes);


// Catch-all route for unmatched requests
app.use((req, res) => {
  res.status(404).send('Page not found');
});

const port = 3002;
app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}`);
});
