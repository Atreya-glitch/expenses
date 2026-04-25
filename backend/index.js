const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');

const app = express();
app.use(cors({ 
  origin: true, 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running');
});

const PORT = process.env.PORT || 5000;

async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (mongoUri) {
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB Atlas');
    } else {
      throw new Error('No MONGO_URI provided in environment variables');
    }
  } catch (err) {
    console.error('Database connection error:', err.message);
    if (process.env.VERCEL) {
      // Don't crash on Vercel, just log the error. The function will fail on request.
    } else {
      process.exit(1);
    }
  }
}

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    if (process.env.VERCEL) {
      console.log('Running in Vercel environment');
    } else {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  }).catch(err => {
    console.error('Failed to connect to database', err);
  });
}

module.exports = app;
