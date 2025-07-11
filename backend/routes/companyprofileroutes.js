import express from 'express';
import {
  getCompanyProfile,
  updateCompanyProfile,
  uploadLogo,
  deleteCompanyProfile,
  upload
} from '../controller/companyprofilecontroller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/company-profile', auth, getCompanyProfile);
router.put('/company-profile', auth, updateCompanyProfile);
router.delete('/company-profile', auth, deleteCompanyProfile);
router.post('/upload-logo', auth, upload.single('logo'), uploadLogo);

export default router;
