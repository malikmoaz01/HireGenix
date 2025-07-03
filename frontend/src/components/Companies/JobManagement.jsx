
import React, { useState, useEffect } from 'react';
import { Plus, Search, MapPin, DollarSign, Calendar, Eye, Users, Edit, Trash2, Building, Filter, Star, Clock, CheckCircle, XCircle, PauseCircle, Briefcase, Globe, Home, Coffee, TrendingUp, Award, Target } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const JobManagementApp = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredSkills: [],
    salary: { min: '', max: '', currency: 'USD' },
    location: { type: 'remote', city: '', state: '', country: 'USA' },
    employmentType: 'full-time',
    experienceLevel: 'mid',
    applicationDeadline: '',
    status: 'active',
    urgency: 'medium',
    department: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/jobs`);
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const jobData = {
      ...formData,
      requiredSkills: formData.requiredSkills.length > 0 ? formData.requiredSkills : ['JavaScript'],
      salary: {
        min: Number(formData.salary.min),
        max: Number(formData.salary.max),
        currency: formData.salary.currency
      },
      company: '507f1f77bcf86cd799439011'
    };

    try {
      const url = editingJob ? `${API_BASE}/jobs/${editingJob._id}` : `${API_BASE}/jobs`;
      const method = editingJob ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });

      if (response.ok) {
        fetchJobs();
        resetForm();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error saving job:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await fetch(`${API_BASE}/jobs/${id}`, { method: 'DELETE' });
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      requiredSkills: [],
      salary: { min: '', max: '', currency: 'USD' },
      location: { type: 'remote', city: '', state: '', country: 'USA' },
      employmentType: 'full-time',
      experienceLevel: 'mid',
      applicationDeadline: '',
      status: 'active',
      urgency: 'medium',
      department: ''
    });
    setEditingJob(null);
  };

  const startEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      requiredSkills: job.requiredSkills,
      salary: job.salary,
      location: job.location,
      employmentType: job.employmentType,
      experienceLevel: job.experienceLevel,
      applicationDeadline: job.applicationDeadline ? job.applicationDeadline.split('T')[0] : '',
      status: job.status || 'active',
      urgency: job.urgency || 'medium',
      department: job.department || ''
    });
    setShowForm(true);
  };

  const addSkill = (skill) => {
    if (skill && !formData.requiredSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill]
      }));
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(s => s !== skill)
    }));
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="text-green-500" size={16} />;
      case 'paused': return <PauseCircle className="text-yellow-500" size={16} />;
      case 'closed': return <XCircle className="text-red-500" size={16} />;
      default: return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'remote': return <Globe className="text-blue-500" size={16} />;
      case 'hybrid': return <Coffee className="text-purple-500" size={16} />;
      case 'onsite': return <Building className="text-gray-500" size={16} />;
      default: return <MapPin className="text-gray-500" size={16} />;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(job => job.status === 'active').length;
  const totalApplications = jobs.reduce((sum, job) => sum + (job.applicationsCount || 0), 0);
  const totalViews = jobs.reduce((sum, job) => sum + (job.views || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <Building className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Job Management
                </h1>
                <p className="text-gray-600 mt-1">Manage your job postings efficiently</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              {showForm ? 'Cancel' : 'Add New Job'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-800">{totalJobs}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Briefcase className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Jobs</p>
                <p className="text-3xl font-bold text-green-600">{activeJobs}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Target className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Applications</p>
                <p className="text-3xl font-bold text-purple-600">{totalApplications}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Views</p>
                <p className="text-3xl font-bold text-orange-600">{totalViews}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs by title, description, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="closed">Closed</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <Filter size={20} />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Job Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Form fields start */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Job Title */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Job Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Senior React Developer"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Employment Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Employment Type</label>
                    <select
                      value={formData.employmentType}
                      onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Job Description</label>
                  <textarea
                    placeholder="Describe the role, responsibilities, and requirements..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows="4"
                    required
                  />
                </div>

                {/* Salary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Min Salary</label>
                    <input
                      type="number"
                      placeholder="50000"
                      value={formData.salary.min}
                      onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, min: e.target.value } })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Max Salary</label>
                    <input
                      type="number"
                      placeholder="80000"
                      value={formData.salary.max}
                      onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, max: e.target.value } })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Currency</label>
                    <select
                      value={formData.salary.currency}
                      onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, currency: e.target.value } })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="PKR">PKR</option>
                    </select>
                  </div>
                </div>

                {/* Location & Deadline */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Work Location</label>
                    <select
                      value={formData.location.type}
                      onChange={(e) =>
                        setFormData({ ...formData, location: { ...formData.location, type: e.target.value } })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="remote">Remote</option>
                      <option value="onsite">Onsite</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Application Deadline</label>
                    <input
                      type="date"
                      value={formData.applicationDeadline}
                      onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Required Skills</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add skill and press Enter"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.requiredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-blue-200"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-blue-600 hover:text-blue-800 ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {loading ? 'Saving...' : editingJob ? 'Update Job' : 'Create Job'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                    className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}


        {/* Jobs Grid */}
        <div className="grid gap-6">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 text-lg">Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
              <p className="text-gray-600">Create your first job posting to get started!</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                            <Briefcase size={14} />
                            {job.employmentType}
                          </span>
                          <span className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                            <Award size={14} />
                            {job.experienceLevel}
                          </span>
                          {job.urgency && (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(job.urgency)}`}>
                              {job.urgency} priority
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(job)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => deleteJob(job._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.requiredSkills.map((skill, index) => (
                        <span key={index} className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <DollarSign size={16} className="text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">Annual salary</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          {getLocationIcon(job.location.type)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 capitalize">
                            {job.location.type === 'remote' ? 'Remote' : `${job.location.city}, ${job.location.state}`}
                          </p>
                          <p className="text-xs text-gray-500">Work location</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Calendar size={16} className="text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {new Date(job.applicationDeadline).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">Application deadline</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                  <div className="flex gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <div className="bg-orange-100 p-1 rounded">
                        <Eye size={14} className="text-orange-600" />
                      </div>
                      {job.views || 0} views
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="bg-purple-100 p-1 rounded">
                        <Users size={14} className="text-purple-600" />
                      </div>
                      {job.applicationsCount || 0} applications
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(job.status)}
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${job.status === 'active' ? 'bg-green-100 text-green-800' :
                        job.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                      }`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobManagementApp;