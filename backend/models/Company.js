import mongoose from 'mongoose';

const companyProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    trim: true
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+', ''],
    default: ''
  },
  establishedYear: {
    type: String,
    trim: true
  },
  logo: {
    type: String,
    trim: true
  },
  benefits: [{
    type: String,
    trim: true
  }],
  socialLinks: {
    linkedin: {
      type: String,
      trim: true,
      default: ''
    },
    twitter: {
      type: String,
      trim: true,
      default: ''
    },
    facebook: {
      type: String,
      trim: true,
      default: ''
    }
  }
}, {
  timestamps: true
});
 
companyProfileSchema.index({ userId: 1 });

export default mongoose.model('CompanyProfile', companyProfileSchema);