const express = require('express');
const protectedController = require('../controllers/protectedController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, protectedController.getProtectedData);

module.exports = router;
