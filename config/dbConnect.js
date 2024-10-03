const mongoose = require('mongoose');

const Dbconnect = async () => {
  const uri = process.env.MONGODB_URI; // Fetch MongoDB URI from .env
  const serverSelectionTimeoutMS = 5000;

  await mongoose.connect(uri, { serverSelectionTimeoutMS })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB', err);
    });
};

module.exports = Dbconnect;
