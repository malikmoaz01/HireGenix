import React, { useState } from 'react';
import { Search, MapPin, Filter, Bookmark, Clock, DollarSign, Building, Users, Star, Globe, Calendar, TrendingUp, Award, Target, Zap, CheckCircle, ArrowRight, Mail, Phone, Briefcase } from 'lucide-react';

const FindJobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const jobCategories = [
    'All Categories', 'Technology', 'Marketing', 'Design', 'Sales', 'Finance', 'Healthcare', 'Education'
  ];

  const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Remote', 'Contract'];

  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      posted: '2 days ago',
      description: 'We are looking for a skilled Frontend Developer to join our dynamic team...',
      tags: ['React', 'TypeScript', 'Node.js'],
      logo: '🚀'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Design Studio',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90k - $120k',
      posted: '1 day ago',
      description: 'Join our creative team to design amazing user experiences...',
      tags: ['Figma', 'Adobe XD', 'Prototyping'],
      logo: '🎨'
    },
    {
      id: 3,
      title: 'Marketing Manager',
      company: 'GrowthCo',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$85k - $110k',
      posted: '3 days ago',
      description: 'Lead our marketing initiatives and drive growth strategies...',
      tags: ['Digital Marketing', 'SEO', 'Analytics'],
      logo: '📈'
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'AI Solutions',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$130k - $170k',
      posted: '4 days ago',
      description: 'Analyze complex data sets and build predictive models...',
      tags: ['Python', 'Machine Learning', 'SQL'],
      logo: '🤖'
    },
    {
      id: 5,
      title: 'Product Manager',
      company: 'InnovateTech',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$140k - $180k',
      posted: '5 days ago',
      description: 'Drive product strategy and work with cross-functional teams...',
      tags: ['Strategy', 'Agile', 'Analytics'],
      logo: '⚡'
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      company: 'CloudFirst',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$115k - $145k',
      posted: '1 week ago',
      description: 'Manage cloud infrastructure and deployment pipelines...',
      tags: ['AWS', 'Docker', 'Kubernetes'],
      logo: '☁️'
    }
  ];

  const trendingSkills = [
    { skill: 'React', demand: '+25%', jobs: 1250 },
    { skill: 'Python', demand: '+30%', jobs: 2100 },
    { skill: 'AWS', demand: '+35%', jobs: 890 },
    { skill: 'Node.js', demand: '+20%', jobs: 750 },
    { skill: 'Machine Learning', demand: '+45%', jobs: 620 },
    { skill: 'UI/UX Design', demand: '+28%', jobs: 540 }
  ];

  const careerTips = [
    {
      title: 'Optimize Your Resume for ATS',
      description: 'Learn how to format your resume to pass through Applicant Tracking Systems',
      readTime: '5 min read',
      category: 'Resume Tips'
    },
    {
      title: 'Ace Your Video Interview',
      description: 'Essential tips for succeeding in remote video interviews',
      readTime: '7 min read',
      category: 'Interview Prep'
    },
    {
      title: 'Negotiating Your Salary',
      description: 'Strategies to negotiate the best compensation package',
      readTime: '6 min read',
      category: 'Career Growth'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Jobs</h1>
          
          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                />
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {jobCategories.map(category => (
                <option key={category} value={category.toLowerCase()}>{category}</option>
              ))}
            </select>
            <select 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {jobTypes.map(type => (
                <option key={type} value={type.toLowerCase()}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gray-600">Showing {jobs.length} jobs</p>
        </div>

        {/* Job Cards */}
        <div className="space-y-6 mb-12">
          {jobs.map(job => (
            <div key={job.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{job.logo}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-lg text-blue-600 font-medium mb-2">{job.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{job.posted}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Bookmark className="h-6 w-6" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">{job.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                  Apply Now
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Save Job
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Skills Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Trending Skills</h2>
          </div>
          <p className="text-gray-600 mb-6">High-demand skills in today's job market</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingSkills.map(skill => (
              <div key={skill.skill} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{skill.skill}</h3>
                  <span className="text-green-600 text-sm font-medium">{skill.demand}</span>
                </div>
                <p className="text-gray-600 text-sm">{skill.jobs} open positions</p>
              </div>
            ))}
          </div>
        </div>

        {/* Career Tips Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="h-8 w-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Career Tips & Resources</h2>
          </div>
          <p className="text-gray-600 mb-6">Expert advice to boost your job search success</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerTips.map((tip, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors cursor-pointer">
                <div className="text-blue-600 text-sm font-medium mb-2">{tip.category}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{tip.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs">{tip.readTime}</span>
                  <ArrowRight className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Alert Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Never Miss Your Dream Job</h2>
          <p className="text-blue-100 mb-6">Set up job alerts and get notified when new opportunities match your criteria</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Create Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FindJobsPage;