import CompanyProfile from '../models/companymodel.js';
import User from '../models/User.js'; 
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/logos';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'logo-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get company profile
const getCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId).select('name email'); 
    const profile = await CompanyProfile.findOne({ userId });
    
    res.json({
      success: true,
      user: user,
      profile: profile || {
        companyName: '',
        phone: '',
        address: '',
        website: '',
        description: '',
        industry: '',
        companySize: '',
        establishedYear: '',
        logo: '',
        benefits: [],
        socialLinks: {
          linkedin: '',
          twitter: '',
          facebook: ''
        }
      }
    });
  } catch (error) {
    console.error('Error fetching company profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching company profile'
    });
  }
};

// Update company profile
const updateCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      companyName,
      phone,
      address,
      website,
      description,
      industry,
      companySize,
      establishedYear,
      logo,
      benefits,
      socialLinks
    } = req.body;

    // Validate company size if provided
    const validCompanySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+', ''];
    if (companySize && !validCompanySizes.includes(companySize)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid company size'
      });
    }

    // Find existing profile or create new one
    let profile = await CompanyProfile.findOne({ userId });
    
    if (profile) {
      // Update existing profile
      profile.companyName = companyName || profile.companyName;
      profile.phone = phone || profile.phone;
      profile.address = address || profile.address;
      profile.website = website || profile.website;
      profile.description = description || profile.description;
      profile.industry = industry || profile.industry;
      profile.companySize = companySize !== undefined ? companySize : profile.companySize;
      profile.establishedYear = establishedYear || profile.establishedYear;
      profile.logo = logo || profile.logo;
      profile.benefits = benefits || profile.benefits;
      profile.socialLinks = socialLinks || profile.socialLinks;
    } else {
      // Create new profile
      profile = new CompanyProfile({
        userId,
        companyName: companyName || '',
        phone: phone || '',
        address: address || '',
        website: website || '',
        description: description || '',
        industry: industry || '',
        companySize: companySize || '',
        establishedYear: establishedYear || '',
        logo: logo || '',
        benefits: benefits || [],
        socialLinks: socialLinks || {
          linkedin: '',
          twitter: '',
          facebook: ''
        }
      });
    }

    await profile.save();

    res.json({
      success: true,
      message: 'Company profile updated successfully',
      profile: profile
    });
  } catch (error) {
    console.error('Error updating company profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating company profile'
    });
  }
};

// Upload logo
const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    res.json({
      success: true,
      message: 'Logo uploaded successfully',
      filename: req.file.filename,
      path: req.file.path
    });
  } catch (error) {
    console.error('Error uploading logo:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading logo'
    });
  }
};

// Delete company profile
const deleteCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const profile = await CompanyProfile.findOneAndDelete({ userId });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Company profile not found'
      });
    }

    // Delete logo file if exists
    if (profile.logo) {
      const logoPath = path.join('uploads/logos', profile.logo);
      if (fs.existsSync(logoPath)) {
        fs.unlinkSync(logoPath);
      }
    }

    res.json({
      success: true,
      message: 'Company profile deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting company profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting company profile'
    });
  }
};

export {
  getCompanyProfile,
  updateCompanyProfile,
  uploadLogo,
  deleteCompanyProfile,
  upload
};