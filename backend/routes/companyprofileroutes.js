import express from 'express';
import {
  getCompanyProfile,
  updateCompanyProfile,
  uploadLogo,
  deleteCompanyProfile,
  upload
} from '../controller/companyprofilecontroller.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/company-profile', protect, getCompanyProfile);
router.put('/company-profile', protect, updateCompanyProfile);
router.delete('/company-profile', protect, deleteCompanyProfile);
router.post('/upload-logo', protect, upload.single('logo'), uploadLogo);

export default router;
