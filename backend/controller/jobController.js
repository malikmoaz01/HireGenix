import Job from '../models/Job.js';
import mongoose from 'mongoose';
import CompanyProfile from '../models/Company.js';

// Create a new job
export const createJob = async (req, res) => {
  try {
    const userId = req.user._id;  

    const companyProfile = await CompanyProfile.findOne({ userId });

    if (!companyProfile) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found for this user",
      });
    }

    const {
      title,
      description,
      requiredSkills,
      salary,
      location,
      employmentType,
      experienceLevel,
      applicationDeadline
    } = req.body;

    if (!title || !description || !requiredSkills || !salary || !location || !applicationDeadline) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    const job = new Job({
      title,
      description,
      requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [requiredSkills],
      salary,
      location,
      employmentType,
      experienceLevel,
      applicationDeadline,
      company: companyProfile._id  
    });

    await job.save();

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job
    });

  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({
      success: false,
      message: "Error creating job",
      error: error.message
    });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      location,
      employmentType,
      experienceLevel,
      salaryMin,
      salaryMax,
      status = 'active'
    } = req.query;

    const query = { status };

    if (search) {
      query.$text = { $search: search };
    }

    if (location) {
      query['location.type'] = location;
    }

    if (employmentType) {
      query.employmentType = employmentType;
    }

    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }

    if (salaryMin || salaryMax) {
      query['salary.min'] = {};
      if (salaryMin) query['salary.min'].$gte = parseInt(salaryMin);
      if (salaryMax) query['salary.max'] = { $lte: parseInt(salaryMax) };
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
      .populate('company', 'companyName logo industry')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(query);

    res.json({
      success: true,
      data: {
        jobs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error.message
    });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid job ID'
      });
    }

    const job = await Job.findById(id).populate('company', 'name email');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    job.views += 1;
    await job.save();

    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: error.message
    });
  }
};

// Update job
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid job ID'
      });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    }).populate('company', 'name email');

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating job',
      error: error.message
    });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid job ID'
      });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    await Job.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting job',
      error: error.message
    });
  }
};

// Get jobs by company
export const getJobsByCompany = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: 'Company ID is required'
      });
    }

    const jobs = await Job.find({ company: companyId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching company jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching company jobs',
      error: error.message
    });
  }
};

// Job statistics
export const getJobStats = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: 'Company ID is required'
      });
    }

    const stats = await Job.aggregate([
      { $match: { company: new mongoose.Types.ObjectId(companyId) } },
      {
        $group: {
          _id: null,
          totalJobs: { $sum: 1 },
          activeJobs: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
          pausedJobs: { $sum: { $cond: [{ $eq: ['$status', 'paused'] }, 1, 0] } },
          closedJobs: { $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] } },
          totalViews: { $sum: '$views' },
          totalApplications: { $sum: '$applicationsCount' }
        }
      }
    ]);

    const result = stats[0] || {
      totalJobs: 0,
      activeJobs: 0,
      pausedJobs: 0,
      closedJobs: 0,
      totalViews: 0,
      totalApplications: 0
    };

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching job stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job statistics',
      error: error.message
    });
  }
};
