const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Find a user by email (for login and signup validation)
const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

// Create a new user in PostgreSQL (used in signup)
const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  return await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword
    }
  });
};

module.exports = {
  findUserByEmail,
  createUser
};
