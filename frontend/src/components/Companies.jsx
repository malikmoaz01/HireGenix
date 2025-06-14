import React, { useState } from 'react';
import { Search, MapPin, Filter, Bookmark, Clock, DollarSign, Building, Users, Star, Globe, Calendar, TrendingUp, Award, Target, Zap, CheckCircle, ArrowRight, Mail, Phone, Briefcase } from 'lucide-react';

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');

  const industries = [
    'All Industries', 'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Manufacturing'
  ];

  const companySizes = ['All Sizes', 'Startup (1-10)', 'Small (11-50)', 'Medium (51-200)', 'Large (201-1000)', 'Enterprise (1000+)'];

  const companies = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      industry: 'Technology',
      size: '201-500 employees',
      location: 'San Francisco, CA',
      description: 'Leading technology company focused on innovative solutions for modern businesses.',
      rating: 4.8,
      reviews: 245,
      openJobs: 12,
      logo: '🚀',
      founded: '2015',
      website: 'techcorp.com'
    },
    {
      id: 2,
      name: 'HealthFirst Solutions',
      industry: 'Healthcare',
      size: '501-1000 employees',
      location: 'Boston, MA',
      description: 'Revolutionizing healthcare through cutting-edge medical technology and patient care.',
      rating: 4.6,
      reviews: 189,
      openJobs: 8,
      logo: '🏥',
      founded: '2012',
      website: 'healthfirst.com'
    },
    {
      id: 3,
      name: 'FinanceFlow',
      industry: 'Finance',
      size: '101-200 employees',
      location: 'New York, NY',
      description: 'Modern financial services company providing innovative banking and investment solutions.',
      rating: 4.4,
      reviews: 156,
      openJobs: 15,
      logo: '💰',
      founded: '2018',
      website: 'financeflow.com'
    },
    {
      id: 4,
      name: 'EduTech Academy',
      industry: 'Education',
      size: '51-100 employees',
      location: 'Austin, TX',
      description: 'Online education platform transforming how people learn and develop new skills.',
      rating: 4.7,
      reviews: 98,
      openJobs: 6,
      logo: '📚',
      founded: '2019',
      website: 'edutech.com'
    },
    {
      id: 5,
      name: 'GreenEnergy Corp',
      industry: 'Energy',
      size: '1000+ employees',
      location: 'Denver, CO',
      description: 'Sustainable energy solutions for a cleaner, greener future.',
      rating: 4.5,
      reviews: 312,
      openJobs: 22,
      logo: '🌱',
      founded: '2010',
      website: 'greenenergy.com'
    },
    {
      id: 6,
      name: 'Design Studio Pro',
      industry: 'Creative',
      size: '11-50 employees',
      location: 'Los Angeles, CA',
      description: 'Award-winning design agency specializing in branding and digital experiences.',
      rating: 4.9,
      reviews: 87,
      openJobs: 4,
      logo: '🎨',
      founded: '2016',
      website: 'designstudio.com'
    }
  ];

  const topEmployers = [
    { name: 'Google', rating: 4.9, jobs: 2500, industry: 'Technology' },
    { name: 'Microsoft', rating: 4.8, jobs: 1800, industry: 'Technology' },
    { name: 'Apple', rating: 4.7, jobs: 1200, industry: 'Technology' },
    { name: 'Amazon', rating: 4.6, jobs: 3200, industry: 'E-commerce' },
    { name: 'Meta', rating: 4.5, jobs: 950, industry: 'Technology' }
  ];

  const companySpotlight = {
    name: 'InnovateCorp',
    logo: '🌟',
    industry: 'Technology',
    location: 'San Francisco, CA',
    employees: '500-1000',
    rating: 4.8,
    description: 'Leading the future of AI and machine learning solutions. Join our team of innovators working on cutting-edge projects that shape tomorrow.',
    benefits: ['Health Insurance', 'Remote Work', '401k Match', 'Learning Budget', 'Flexible Hours'],
    openRoles: 15,
    recentNews: 'Just raised $50M Series B funding'
  };

  const industryStats = [
    { name: 'Technology', companies: 1250, growth: '+12%', icon: '💻' },
    { name: 'Healthcare', companies: 890, growth: '+8%', icon: '🏥' },
    { name: 'Finance', companies: 650, growth: '+15%', icon: '💰' },
    { name: 'Education', companies: 420, growth: '+22%', icon: '📚' }
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || 
                           company.industry.toLowerCase() === selectedIndustry.replace('all industries', 'all');
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Companies</h1>
          
          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              {industries.map(industry => (
                <option key={industry} value={industry.toLowerCase()}>{industry}</option>
              ))}
            </select>
            <select 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {companySizes.map(size => (
                <option key={size} value={size.toLowerCase()}>{size}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gray-600">Showing {filteredCompanies.length} companies</p>
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredCompanies.map(company => (
            <div key={company.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{company.logo}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{company.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{company.industry}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{company.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{company.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{company.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">{company.reviews} reviews</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{company.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Founded {company.founded}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span>{company.website}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium text-green-600">{company.openJobs} open positions</span>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm">
                    View Jobs
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Spotlight */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Award className="h-8 w-8 text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-900">Company Spotlight</h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <div className="flex items-start space-x-6">
              <div className="text-6xl">{companySpotlight.logo}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">{companySpotlight.name}</h3>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="text-gray-900 font-medium">{companySpotlight.rating}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-gray-600 mb-4">
                  <span>{companySpotlight.industry}</span>
                  <span>{companySpotlight.location}</span>
                  <span>{companySpotlight.employees} employees</span>
                </div>
                <p className="text-gray-700 mb-4">{companySpotlight.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {companySpotlight.benefits.map(benefit => (
                    <span key={benefit} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      {benefit}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="text-green-600 font-medium">{companySpotlight.openRoles} open roles</span>
                    <span className="mx-2">•</span>
                    <span>{companySpotlight.recentNews}</span>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                    View Company
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Employers */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="h-8 w-8 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Top Employers</h2>
          </div>
          <p className="text-gray-600 mb-6">Most popular companies among job seekers</p>
          <div className="space-y-4">
            {topEmployers.map((employer, index) => (
              <div key={employer.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{employer.name}</h3>
                    <p className="text-gray-600 text-sm">{employer.industry}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-gray-900 font-medium">{employer.rating}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{employer.jobs} jobs</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Statistics */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Industry Overview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryStats.map(stat => (
              <div key={stat.name} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{stat.icon}</div>
                  <div className="text-green-600 font-semibold text-sm">{stat.growth}</div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{stat.name}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.companies}</p>
                <p className="text-gray-600 text-sm">Companies</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Company?</h2>
          <p className="text-xl mb-6 opacity-90">Join thousands of professionals who found their perfect match</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Create Profile
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Browse All Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;