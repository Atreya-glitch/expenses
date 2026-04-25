const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');

const app = express();

// Middleware
app.use(cors({ 
  origin: true, 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// Database connection (Non-blocking)
let dbError = null;
const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  mongoose.connect(mongoUri)
    .then(() => {
      console.log('Connected to MongoDB Atlas');
      dbError = null;
    })
    .catch(err => {
      dbError = err.message;
      console.error('Database connection error:', err.message);
    });
}

// Routes (handle both /api prefix and root for Vercel compatibility)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/expenses', expenseRoutes);

app.get(['/', '/api'], (req, res) => {
  res.json({ 
    status: 'Running', 
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting...',
    dbError: dbError,
    env: process.env.NODE_ENV
  });
});

// For local development
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
