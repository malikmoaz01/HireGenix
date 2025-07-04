import express from 'express';
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByCompany,
  getJobStats
} from '../controller/companyController.js';

const router = express.Router();

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);

// Protected routes (require authentication)
router.post('/',  createJob);
router.put('/:id',  updateJob);
router.delete('/:id',  deleteJob);
router.get('/company/jobs',  getJobsByCompany);
router.get('/company/stats',  getJobStats);

export default router; 