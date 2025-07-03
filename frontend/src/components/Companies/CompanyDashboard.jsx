import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Eye, 
  MessageCircle, 
  CheckCircle, 
  Clock,
  DollarSign,
  UserCheck,
  Calendar,
  Star,
  Award,
  Target,
  Activity,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Search,
  Filter,
  Download,
  Plus
} from 'lucide-react';

const CompanyDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalJobs: 12,
    activeJobs: 8,
    totalApplications: 156,
    shortlistedCandidates: 24,
    interviewsScheduled: 8,
    hiredThisMonth: 3
  });

  // Get user info from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Get company name
  const getCompanyName = (user) => {
    if (!user) return 'Company';
    return user.companyName || user.company_name || user.company || user.name || 'Company';
  };

  // Sample data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'application',
      message: 'New application received for Senior Developer position',
      time: '2 hours ago',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'interview',
      message: 'Interview scheduled with Sarah Johnson',
      time: '4 hours ago',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'job',
      message: 'Frontend Developer job posted successfully',
      time: '1 day ago',
      icon: Briefcase,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'hire',
      message: 'John Doe accepted the offer for UI/UX Designer',
      time: '2 days ago',
      icon: UserCheck,
      color: 'text-emerald-600'
    }
  ];

  // Sample data for top performing jobs
  const topJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      applications: 45,
      views: 234,
      posted: '5 days ago',
      status: 'active',
      location: 'Remote'
    },
    {
      id: 2,
      title: 'Product Manager',
      applications: 38,
      views: 187,
      posted: '1 week ago',
      status: 'active',
      location: 'New York'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      applications: 52,
      views: 298,
      posted: '3 days ago',
      status: 'active',
      location: 'San Francisco'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add proper padding and spacing */}
      <div className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Welcome back, {getCompanyName(user)}! 👋
                </h1>
                <p className="text-gray-600 mt-2">
                  Here's what's happening with your recruitment today
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
                  <Plus className="h-5 w-5" />
                  <span className="text-sm lg:text-base">Post New Job</span>
                </button>
                <button className="p-2 lg:p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                  <Download className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-8">
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Jobs</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
                </div>
                <div className="p-2 lg:p-3 bg-blue-100 rounded-lg">
                  <Briefcase className="h-5 lg:h-6 w-5 lg:w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <ArrowUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+2 this month</span>
              </div>
            </div>

            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Active Jobs</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
                </div>
                <div className="p-2 lg:p-3 bg-green-100 rounded-lg">
                  <Activity className="h-5 lg:h-6 w-5 lg:w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <ArrowUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+1 this week</span>
              </div>
            </div>

            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Applications</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                </div>
                <div className="p-2 lg:p-3 bg-purple-100 rounded-lg">
                  <Users className="h-5 lg:h-6 w-5 lg:w-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <ArrowUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+12 today</span>
              </div>
            </div>

            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Shortlisted</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{stats.shortlistedCandidates}</p>
                </div>
                <div className="p-2 lg:p-3 bg-orange-100 rounded-lg">
                  <Star className="h-5 lg:h-6 w-5 lg:w-6 text-orange-600" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <ArrowUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+5 this week</span>
              </div>
            </div>

            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Interviews</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{stats.interviewsScheduled}</p>
                </div>
                <div className="p-2 lg:p-3 bg-pink-100 rounded-lg">
                  <Calendar className="h-5 lg:h-6 w-5 lg:w-6 text-pink-600" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 ml-1">3 today</span>
              </div>
            </div>

            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Hired</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{stats.hiredThisMonth}</p>
                </div>
                <div className="p-2 lg:p-3 bg-emerald-100 rounded-lg">
                  <UserCheck className="h-5 lg:h-6 w-5 lg:w-6 text-emerald-600" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <Award className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-emerald-600 ml-1">This month</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Recent Activities</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start space-x-4 p-3 lg:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                          <Icon className={`h-5 w-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  <button className="w-full flex items-center space-x-3 p-3 lg:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
                    <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
                      <Plus className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Post New Job</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 lg:p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
                    <div className="p-2 bg-green-600 rounded-lg group-hover:bg-green-700 transition-colors">
                      <Search className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Search Candidates</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 lg:p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group">
                    <div className="p-2 bg-purple-600 rounded-lg group-hover:bg-purple-700 transition-colors">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Schedule Interview</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 lg:p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group">
                    <div className="p-2 bg-orange-600 rounded-lg group-hover:bg-orange-700 transition-colors">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">View Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performing Jobs */}
          <div className="mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Top Performing Jobs</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Job Title</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Applications</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Views</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Posted</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4">
                          <div className="font-medium text-gray-900">{job.title}</div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-900">{job.applications}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-900">{job.views}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-600">{job.posted}</span>
                        </td>
                        <td className="py-4">
                          <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {job.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-600">{job.location}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;