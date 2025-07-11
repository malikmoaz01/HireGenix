import Job from '../models/Job.js';
import mongoose from 'mongoose';

// Create a new job
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      jobType,
      jobCategory,
      experienceLevel,
      requiredSkills
    } = req.body;

    // Validate required fields
    if (!title || !description || !company || !location || !salary) {
      return res.status(400).json({
        message: 'All required fields must be provided'
      });
    }

    const job = new Job({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      jobCategory,
      experienceLevel,
      requiredSkills: requiredSkills || [],
      postedBy: req.user.userId
    });

    await job.save();

    res.status(201).json({
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({
      message: 'Error creating job',
      error: error.message
    });
  }
};

// Get all jobs posted by the authenticated company
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.userId })
      .populate('applications')
      .sort({ createdAt: -1 });

    // Calculate statistics
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(job => job.status === 'active').length;
    const totalApplications = jobs.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
    const totalViews = jobs.reduce((sum, job) => sum + (job.views || 0), 0);

    const stats = {
      totalJobs,
      activeJobs,
      totalApplications,
      totalViews
    };

    res.json({
      jobs,
      stats
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      message: 'Error fetching jobs',
      error: error.message
    });
  }
};

// Get all active jobs (for job seekers)
export const getAllJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      location,
      jobType,
      experienceLevel,
      search
    } = req.query;

    const filter = { status: 'active' };

    // Apply filters
    if (category) filter.jobCategory = category;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (jobType) filter.jobType = jobType;
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    const jobs = await Job.find(filter)
      .populate('postedBy', 'companyName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalJobs = await Job.countDocuments(filter);

    res.json({
      jobs,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      message: 'Error fetching jobs',
      error: error.message
    });
  }
};

// Get a single job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid job ID' });
    }

    const job = await Job.findById(id)
      .populate('postedBy', 'companyName email')
      .populate('applications');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Increment views count
    job.views += 1;
    await job.save();

    res.json({ job });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({
      message: 'Error fetching job',
      error: error.message
    });
  }
};

// Update job status
export const updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid job ID' });
    }

    if (!['active', 'paused', 'closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const job = await Job.findOne({ _id: id, postedBy: req.user.userId });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    job.status = status;
    job.updatedAt = new Date();
    await job.save();

    res.json({
      message: 'Job status updated successfully',
      job
    });
  } catch (error) {
    console.error('Error updating job status:', error);
    res.status(500).json({
      message: 'Error updating job status',
      error: error.message
    });
  }
};

// Update job details
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid job ID' });
    }

    const job = await Job.findOne({ _id: id, postedBy: req.user.userId });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    // Update allowed fields
    const allowedFields = [
      'title', 'description', 'company', 'location', 'salary',
      'jobType', 'jobCategory', 'experienceLevel', 'requiredSkills'
    ];

    allowedFields.forEach(field => {
      if (updateData[field] !== undefined) {
        job[field] = updateData[field];
      }
    });

    job.updatedAt = new Date();
    await job.save();

    res.json({
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({
      message: 'Error updating job',
      error: error.message
    });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid job ID' });
    }

    const job = await Job.findOne({ _id: id, postedBy: req.user.userId });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    await Job.findByIdAndDelete(id);

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({
      message: 'Error deleting job',
      error: error.message
    });
  }
};

// Get job statistics for dashboard
export const getJobStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const stats = await Job.aggregate([
      { $match: { postedBy: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalJobs: { $sum: 1 },
          activeJobs: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          pausedJobs: {
            $sum: { $cond: [{ $eq: ['$status', 'paused'] }, 1, 0] }
          },
          closedJobs: {
            $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] }
          },
          totalViews: { $sum: '$views' },
          totalApplications: { $sum: { $size: '$applications' } }
        }
      }
    ]);

    const result = stats.length > 0 ? stats[0] : {
      totalJobs: 0,
      activeJobs: 0,
      pausedJobs: 0,
      closedJobs: 0,
      totalViews: 0,
      totalApplications: 0
    };

    res.json(result);
  } catch (error) {
    console.error('Error fetching job stats:', error);
    res.status(500).json({
      message: 'Error fetching job statistics',
      error: error.message
    });
  }
};