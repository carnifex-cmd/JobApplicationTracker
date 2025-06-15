const express = require('express');
const router = express.Router();
const { 
  signup, 
  login, 
  getProfile, 
  signupValidation, 
  loginValidation 
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// POST /api/auth/signup
router.post('/signup', signupValidation, signup);

// POST /api/auth/login
router.post('/login', loginValidation, login);

// GET /api/auth/profile
router.get('/profile', authenticateToken, getProfile);

module.exports = router; 