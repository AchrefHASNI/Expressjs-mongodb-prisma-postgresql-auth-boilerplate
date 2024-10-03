const express = require('express');
const authController = require('../controllers/authController');
const { validateSignup, handleValidationErrors } = require('../middlewares/inputValidator');
const limiter = require('../middlewares/rateLimiter');

const router = express.Router();

// Signup route
router.post('/signup', limiter, validateSignup, handleValidationErrors, authController.signup);

// Login route
router.post('/login', limiter, authController.login);

module.exports = router;
