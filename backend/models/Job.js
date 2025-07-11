import mongoose from 'mongoose';
import Application from '../models/Application.js';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [100, 'Job title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true,
    maxlength: [2000, 'Job description cannot exceed 2000 characters']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  salary: {
    type: String,
    required: [true, 'Salary is required'],
    trim: true,
    maxlength: [50, 'Salary cannot exceed 50 characters']
  },
  jobType: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    default: 'full-time'
  },
  jobCategory: {
    type: String,
    required: true,
    enum: ['technology', 'marketing', 'design', 'sales', 'finance', 'healthcare', 'education'],
    default: 'technology'
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: ['entry', 'mid', 'senior'],
    default: 'entry'
  },
  requiredSkills: [{
    type: String,
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  }],
  status: {
    type: String,
    enum: ['active', 'paused', 'closed'],
    default: 'active'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better performance
jobSchema.index({ postedBy: 1, status: 1 });
jobSchema.index({ jobCategory: 1, status: 1 });
jobSchema.index({ location: 1, status: 1 });
jobSchema.index({ createdAt: -1 });

// Virtual for application count
jobSchema.virtual('applicationCount').get(function() {
  return this.applications ? this.applications.length : 0;
});

// Ensure virtual fields are serialized
jobSchema.set('toJSON', {
  virtuals: true
});

const Job = mongoose.model('Job', jobSchema);

export default Job;