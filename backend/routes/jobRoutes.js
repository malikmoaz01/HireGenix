import express from 'express';
import {
  createJob,
  getMyJobs,
  getAllJobs,
  getJobById,
  updateJobStatus,
  updateJob,
  deleteJob,
  getJobStats
} from '../controller/jobController.js';
import { auth, companyOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/all', getAllJobs);

// Protected routes (authentication required)
router.use(auth);

// Company-only routes - IMPORTANT: More specific routes must come before parameterized routes
router.post('/', companyOnly, createJob);
router.get('/my-jobs', companyOnly, getMyJobs);
router.get('/stats/dashboard', companyOnly, getJobStats);
router.patch('/:id/status', companyOnly, updateJobStatus);
router.put('/:id', companyOnly, updateJob);
router.delete('/:id', companyOnly, deleteJob);

// Parameterized routes should come last
router.get('/:id', getJobById);

export default router;