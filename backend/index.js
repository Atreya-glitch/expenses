const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');

const app = express();
app.use(cors({ 
  origin: ['http://localhost:8081', 'https://frontend-atreyasharma9-9673s-projects.vercel.app'], 
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
      throw new Error('No URI');
    }
  } catch (err) {
    console.log('Falling back to mongodb-memory-server...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log('Connected to mongodb-memory-server');
  }
}

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to connect to database', err);
});
