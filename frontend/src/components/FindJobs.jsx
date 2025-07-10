import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Bookmark, Clock, DollarSign, Building, Users, Star, Globe, Calendar, TrendingUp, Award, Target, Zap, CheckCircle, ArrowRight, Mail, Phone, Briefcase, Coffee, Home, Eye, ChevronDown, ChevronUp, ExternalLink, Share2, Heart, BookmarkPlus } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const FindJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [salaryRange, setSalaryRange] = useState([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [expandedJobs, setExpandedJobs] = useState(new Set());
  const [sortBy, setSortBy] = useState('newest');

  const jobCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' }
  ];

  const jobTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'remote', label: 'Remote' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance' }
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/jobs`);
      const data = await response.json();
      console.log(data);
      if (data.success && data.data.jobs) {
        setJobs(data.data.jobs.filter(job => job.status === 'active'));
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (location) params.append('location', location);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedType !== 'all') params.append('type', selectedType);
      if (selectedExperience !== 'all') params.append('experience', selectedExperience);
      
      const response = await fetch(`${API_BASE}/jobs?${params}`);
      const data = await response.json();
      if (data.success && data.data.jobs) {
        setJobs(data.data.jobs.filter(job => job.status === 'active'));
      }
    } catch (error) {
      console.error('Error searching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementJobViews = async (jobId) => {
    try {
      await fetch(`${API_BASE}/jobs/${jobId}/view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const applyToJob = async (jobId) => {
    try {
      await fetch(`${API_BASE}/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantId: '507f1f77bcf86cd799439022',
          coverLetter: 'Application via job portal'
        })
      });
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying to job:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  const toggleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const toggleExpandJob = (jobId) => {
    const newExpandedJobs = new Set(expandedJobs);
    if (newExpandedJobs.has(jobId)) {
      newExpandedJobs.delete(jobId);
    } else {
      newExpandedJobs.add(jobId);
      incrementJobViews(jobId);
    }
    setExpandedJobs(newExpandedJobs);
  };

  const getLocationIcon = (locationType) => {
    switch (locationType) {
      case 'remote': return <Globe className="text-blue-500" size={16} />;
      case 'hybrid': return <Coffee className="text-purple-500" size={16} />;
      case 'onsite': return <Building className="text-gray-500" size={16} />;
      default: return <MapPin className="text-gray-500" size={16} />;
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const jobDate = new Date(date);
    const diffTime = Math.abs(now - jobDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getCompanyInfo = (job) => {
    const companyInfo = {
      name: null,
      size: '',
      website: '',
      address: '',
      industry: '',
      description: '',
      establishedYear: '',
      logo: null
    };

    if (job.companyProfile) {
      companyInfo.name = job.companyProfile.companyName || null;
      companyInfo.size = job.companyProfile.companySize || '';
      companyInfo.website = job.companyProfile.website || '';
      companyInfo.address = job.companyProfile.address || '';
      companyInfo.industry = job.companyProfile.industry || '';
      companyInfo.description = job.companyProfile.description || '';
      companyInfo.establishedYear = job.companyProfile.establishedYear || '';
      
      if (job.companyProfile.logo) {
        companyInfo.logo = `${API_BASE.replace('/api', '')}/uploads/logos/${job.companyProfile.logo}`;
      }
    }

    if (job.company) {
      companyInfo.name = job.company.companyName || job.company.name || null;
      companyInfo.size = job.company.size || companyInfo.size;
      companyInfo.website = job.company.website || companyInfo.website;
      companyInfo.address = job.company.address || companyInfo.address;
      companyInfo.industry = job.company.industry || companyInfo.industry;
    }

    if (job.companyName) {
      companyInfo.name = job.companyName;
    }

    if (job.postedBy?.name && !companyInfo.name) {
      companyInfo.name = job.postedBy.name;
    }

    return companyInfo;
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requiredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !location || 
      job.location.city?.toLowerCase().includes(location.toLowerCase()) ||
      job.location.state?.toLowerCase().includes(location.toLowerCase()) ||
      job.location.type.toLowerCase().includes(location.toLowerCase());
    
    const matchesType = selectedType === 'all' || job.employmentType === selectedType;
    const matchesExperience = selectedExperience === 'all' || job.experienceLevel === selectedExperience;
    const matchesSalary = job.salary.min >= salaryRange[0] && job.salary.max <= salaryRange[1];
    
    return matchesSearch && matchesLocation && matchesType && matchesExperience && matchesSalary;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
      case 'salary-high': return b.salary.max - a.salary.max;
      case 'salary-low': return a.salary.min - b.salary.min;
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Find Your Dream Job
              </h1>
              <p className="text-gray-600 mt-2">Discover opportunities that match your skills and aspirations</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{sortedJobs.length}</p>
              <p className="text-sm text-gray-600">Available positions</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Search className="h-5 w-5" />
                Search Jobs
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            {jobCategories.slice(0, 8).map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                }`}
              >
                {category.label}
              </button>
            ))}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-300 transition-all flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              More Filters
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {showFilters && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {jobTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="salary-high">Highest Salary</option>
                    <option value="salary-low">Lowest Salary</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading amazing opportunities...</p>
          </div>
        ) : sortedJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or explore different categories</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedJobs.map(job => {
              const companyInfo = getCompanyInfo(job);
              
              return (
                <div key={job._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="relative">
                          {companyInfo.logo ? (
                            <img 
                              src={companyInfo.logo} 
                              alt={`${companyInfo.name} logo`}
                              className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className={`bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-xl flex items-center justify-center ${companyInfo.logo ? 'hidden' : 'flex'}`}>
                            <Building className="h-8 w-8 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            {companyInfo.name && (
                              <p className="text-lg text-blue-600 font-medium">
                                {companyInfo.name}
                              </p>
                            )}
                            {companyInfo.size && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                {companyInfo.size} employees
                              </span>
                            )}
                            {companyInfo.industry && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                                {companyInfo.industry}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              {getLocationIcon(job.location.type)}
                              <span>
                                {job.location.type === 'remote' ? 'Remote' : 
                                 job.location.city ? `${job.location.city}, ${job.location.state}` : 
                                 job.location.type}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span className="capitalize">{job.employmentType}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{getTimeAgo(job.createdAt)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {job.views || 0} views
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {job.applicationsCount || 0} applications
                            </span>
                            <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              <Award className="h-3 w-3" />
                              {job.experienceLevel}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleSaveJob(job._id)}
                          className={`p-2 rounded-lg transition-all ${
                            savedJobs.has(job._id) 
                              ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                              : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          {savedJobs.has(job._id) ? <Heart className="h-5 w-5 fill-current" /> : <Heart className="h-5 w-5" />}
                        </button>
                        <button
                          onClick={() => toggleExpandJob(job._id)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          {expandedJobs.has(job._id) ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {expandedJobs.has(job._id) ? job.description : job.description.substring(0, 150) + '...'}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requiredSkills.slice(0, expandedJobs.has(job._id) ? job.requiredSkills.length : 5).map(skill => (
                        <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                      {!expandedJobs.has(job._id) && job.requiredSkills.length > 5 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          +{job.requiredSkills.length - 5} more
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">
                      <button
                        onClick={() => applyToJob(job._id)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Apply Now
                      </button>
                      <button
                        onClick={() => toggleSaveJob(job._id)}
                        className={`px-6 py-3 rounded-lg border transition-all duration-300 flex items-center gap-2 ${
                          savedJobs.has(job._id)
                            ? 'border-red-300 text-red-600 bg-red-50 hover:bg-red-100'
                            : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                        }`}
                      >
                        {savedJobs.has(job._id) ? <Heart className="h-4 w-4 fill-current" /> : <BookmarkPlus className="h-4 w-4" />}
                        {savedJobs.has(job._id) ? 'Saved' : 'Save Job'}
                      </button>
                      <button className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Get Job Alerts</h2>
          <p className="text-blue-100 mb-6">Never miss opportunities that match your skills and preferences</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Subscribe
            </button>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default FindJobsPage;