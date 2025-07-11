import express from 'express';
import { createJob, getMyJobs, updateJobStatus, deleteJob, getAllJobs } from '../controller/jobController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Create a new job (company only)
router.post('/', auth, createJob);

// Get all jobs posted by the logged-in company
router.get('/my-jobs', auth, getMyJobs);

// Get all jobs (for job seekers)
router.get('/', getAllJobs);

// Update job status
router.patch('/:jobId/status', auth, updateJobStatus);

// Delete job
router.delete('/:jobId', auth, deleteJob);

export default router;