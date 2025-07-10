// controllers/profileController.js
import Profile from '../models/Profile.js';
import User from '../models/User.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for resume uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/resumes');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Create unique filename: userId_timestamp_originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = `${req.userId}_${uniqueSuffix}_${file.originalname}`;
    cb(null, fileName);
  }
});

// File filter for PDFs only
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

// Configure multer
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    const user = await User.findById(req.userId).select('-password');
   
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      },
      profile: profile || {}
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create/Update profile
export const updateProfile = async (req, res) => {
  try {
    const { phone, skills, experience, education, resume } = req.body;
   
    let profile = await Profile.findOne({ userId: req.userId });
   
    if (profile) {
      // Update existing profile
      profile.phone = phone || profile.phone;
      profile.skills = skills || profile.skills;
      profile.experience = experience || profile.experience;
      profile.education = education || profile.education;
      profile.resume = resume || profile.resume;
     
      await profile.save();
    } else {
      // Create new profile
      profile = new Profile({
        userId: req.userId,
        phone,
        skills,
        experience,
        education,
        resume
      });
      await profile.save();
    }
   
    res.json({
      message: 'Profile updated successfully',
      profile
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Upload resume
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get current profile to delete old resume file if exists
    const profile = await Profile.findOne({ userId: req.userId });
    
    if (profile && profile.resume) {
      // Delete old resume file
      const oldFilePath = path.join(__dirname, '../uploads/resumes', profile.resume);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // Update profile with new resume filename
    if (profile) {
      profile.resume = req.file.filename;
      await profile.save();
    } else {
      // Create new profile if it doesn't exist
      const newProfile = new Profile({
        userId: req.userId,
        resume: req.file.filename
      });
      await newProfile.save();
    }

    res.json({
      message: 'Resume uploaded successfully',
      filename: req.file.filename
    });
  } catch (error) {
    // Delete uploaded file if database operation fails
    if (req.file) {
      const filePath = path.join(__dirname, '../uploads/resumes', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Download resume
export const downloadResume = async (req, res) => {
  try {
    const { filename } = req.params;
    
    // Verify the file belongs to the current user
    const profile = await Profile.findOne({ userId: req.userId });
    
    if (!profile || profile.resume !== filename) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    const filePath = path.join(__dirname, '../uploads/resumes', filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Send file
    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete resume
export const deleteResume = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    
    if (!profile || !profile.resume) {
      return res.status(404).json({ message: 'No resume found' });
    }
    
    // Delete file from filesystem
    const filePath = path.join(__dirname, '../uploads/resumes', profile.resume);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Update profile to remove resume reference
    profile.resume = '';
    await profile.save();
    
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};