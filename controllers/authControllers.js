const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MongooseUser = require('../models/mongooseUser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Signup with both Mongoose (MongoDB) and Prisma (PostgreSQL)
const signup = async (req, res, next) => {
  try {
    const { username, email, password, db } = req.body;

    if (db === 'mongo') {
      const existingUser = await MongooseUser.findOne({ email });
      if (existingUser) return res.status(400).send('User already exists');
      
      const user = new MongooseUser({ username, email, password });
      await user.save();
      res.status(201).send('User created (MongoDB)');
      
    } else if (db === 'postgres') {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) return res.status(400).send('User already exists');
      
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: { username, email, password: hashedPassword }
      });
      res.status(201).send('User created (PostgreSQL)');
    }
  } catch (error) {
    next(error);
  }
};

// Login remains the same (based on `db` field)
const login = async (req, res, next) => {
  try {
    const { email, password, db } = req.body;
    
    if (db === 'mongo') {
      const user = await MongooseUser.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.send({ token });
      
    } else if (db === 'postgres') {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.send({ token });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };
