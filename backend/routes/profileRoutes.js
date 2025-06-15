// routes/profileRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import { getProfile, updateProfile } from '../controller/profileController.js';

const router = express.Router();

// Simple auth middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;