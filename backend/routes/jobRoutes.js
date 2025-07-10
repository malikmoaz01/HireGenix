import express from 'express';
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByCompany,
  getJobStats
} from '../controller/jobController.js';

import protect from '../middleware/authmiddleware.js';

const router = express.Router();

// IMPORTANT: Specific routes must come BEFORE parameterized routes
// Protected routes with specific paths
router.get('/company/jobs', protect, getJobsByCompany);
router.get('/company/stats', protect, getJobStats);

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById); // This must come after specific routes

// Protected routes
router.post('/', protect, createJob);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);

export default router;