// controllers/profileController.js
import Profile from '../models/Profile.js';
import User from '../models/User.js';

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