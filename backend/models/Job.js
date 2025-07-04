import mongoose from 'mongoose';

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyProfile',
    required: [true, 'Company is required']
  },
  requiredSkills: [{
    type: String,
    trim: true
  }],
  salary: {
    min: {
      type: Number,
      required: [true, 'Minimum salary is required'],
      min: [0, 'Salary cannot be negative']
    },
    max: {
      type: Number,
      required: [true, 'Maximum salary is required'],
      min: [0, 'Salary cannot be negative']
    },
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'GBP', 'PKR'],
      default: 'USD'
    }
  },
  location: {
    type: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      default: 'remote'
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true,
      default: 'USA'
    }
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
    default: 'full-time'
  },
  experienceLevel: {
    type: String,
    enum: ['entry', 'mid', 'senior', 'lead', 'executive'],
    default: 'mid'
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'closed'],
    default: 'active'
  },
  applicationDeadline: {
    type: Date,
    required: [true, 'Application deadline is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Application deadline must be in the future'
    }
  },
  views: {
    type: Number,
    default: 0
  },
  applicationsCount: {
    type: Number,
    default: 0
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ company: 1, status: 1 });
jobSchema.index({ createdAt: -1 });
jobSchema.index({ applicationDeadline: 1 });
jobSchema.index({ 'salary.min': 1, 'salary.max': 1 });

// Virtual for formatted salary
jobSchema.virtual('salaryRange').get(function() {
  return `${this.salary.currency} ${this.salary.min.toLocaleString()} - ${this.salary.max.toLocaleString()}`;
});

// Virtual for days until deadline
jobSchema.virtual('daysUntilDeadline').get(function() {
  const today = new Date();
  const deadline = new Date(this.applicationDeadline);
  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Pre-save middleware to validate salary range
jobSchema.pre('save', function(next) {
  if (this.salary.min > this.salary.max) {
    const error = new Error('Minimum salary cannot be greater than maximum salary');
    return next(error);
  }
  next();
});

// Method to increment views
jobSchema.methods.incrementViews = function() {
  this.views = this.views + 1;
  return this.save();
};

// Method to increment applications count
jobSchema.methods.incrementApplications = function() {
  this.applicationsCount = this.applicationsCount + 1;
  return this.save();
};

// Static method to find active jobs
jobSchema.statics.findActiveJobs = function(limit = 10) {
  return this.find({ 
    status: 'active', 
    isDeleted: false,
    applicationDeadline: { $gt: new Date() }
  })
  .sort({ createdAt: -1 })
  .limit(limit)
  .populate('company', 'name logo');
};

// Static method to search jobs
jobSchema.statics.searchJobs = function(query, filters = {}) {
  const searchCriteria = {
    $and: [
      { isDeleted: false },
      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { requiredSkills: { $in: [new RegExp(query, 'i')] } }
        ]
      }
    ]
  };

  // Apply filters
  if (filters.status) {
    searchCriteria.$and.push({ status: filters.status });
  }
  
  if (filters.employmentType) {
    searchCriteria.$and.push({ employmentType: filters.employmentType });
  }
  
  if (filters.experienceLevel) {
    searchCriteria.$and.push({ experienceLevel: filters.experienceLevel });
  }
  
  if (filters.minSalary || filters.maxSalary) {
    const salaryFilter = {};
    if (filters.minSalary) salaryFilter['salary.min'] = { $gte: filters.minSalary };
    if (filters.maxSalary) salaryFilter['salary.max'] = { $lte: filters.maxSalary };
    searchCriteria.$and.push(salaryFilter);
  }

  return this.find(searchCriteria)
    .sort({ createdAt: -1 })
    .populate('company', 'name logo');
};

const Job = mongoose.model('Job', jobSchema);

export default Job;