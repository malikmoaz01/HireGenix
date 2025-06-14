const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getMe,
  logout,
  forgotPassword
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;