const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/users', require('./routes/users')); // Remove '/api' prefix
app.use('/tasks', require('./routes/tasks')); // Remove '/api' prefix

// Add a catch-all route for debugging
app.use('*', (req, res) => {
  console.log('Received request for:', req.originalUrl);
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API is accessible at: ${process.env.API_URL || `http://localhost:${PORT}`}`);
});