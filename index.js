require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const errorHandler = require('./middlewares/errorHandler');
const Dbconnect = require('./config/dbConnect'); // Import MongoDB connection

const app = express();

// Connect to MongoDB
Dbconnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(xss());

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

app.use(errorHandler); // Error handling middleware

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
