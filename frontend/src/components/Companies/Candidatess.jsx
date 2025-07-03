import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Building2, 
  User, 
  Briefcase, 
  Menu, 
  X, 
  Home,
  Settings,
  Users,
  BarChart3,
  Bell,
  Search,
  LogOut
} from 'lucide-react';

// Mock company data - yahan actual signup ka data hoga
const companyData = {
  name: "Tech Solutions Inc",
  logo: null,
  email: "admin@techsolutions.com"
};

// Header Component
const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center space-x-3">
          <Building2 className="text-blue-600" size={24} />
          <h1 className="text-xl font-semibold text-gray-800">{companyData.name}</h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

// Sidebar Component
const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/company_dashboard', icon: Home, label: 'Dashboard', exact: true },
    { path: '/company_dashboard/company-profile', icon: Building2, label: 'Company Profile' },
    { path: '/company_dashboard/job-management', icon: Briefcase, label: 'Job Management' },
    { path: '/company_dashboard/candidates', icon: Users, label: 'Candidates' },
    { path: '/company_dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/company_dashboard/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className={`bg-gray-900 text-white transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-16'
    } min-h-screen`}>
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Building2 size={24} />
          </div>
          {isOpen && (
            <div>
              <h2 className="font-semibold text-lg">{companyData.name}</h2>
              <p className="text-gray-400 text-sm">Company Portal</p>
            </div>
          )}
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

// Dashboard Main Page
const CompanyDashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to {companyData.name}</h2>
        <p className="text-gray-600">Manage your company operations from here</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Briefcase className="text-blue-600" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Applications</p>
              <p className="text-2xl font-bold text-gray-900">48</p>
            </div>
            <Users className="text-green-600" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interviews</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <User className="text-purple-600" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hired</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <BarChart3 className="text-orange-600" size={32} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    A
                  </div>
                  <div>
                    <p className="font-medium">Applicant {i}</p>
                    <p className="text-sm text-gray-600">Frontend Developer</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/company_dashboard/job-management" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Briefcase className="text-blue-600" size={20} />
                <span className="font-medium">Post New Job</span>
              </div>
            </Link>
            <Link to="/company_dashboard/candidates" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Users className="text-green-600" size={20} />
                <span className="font-medium">View Candidates</span>
              </div>
            </Link>
            <Link to="/company_dashboard/company-profile" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Building2 className="text-purple-600" size={20} />
                <span className="font-medium">Update Profile</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Company Profile Page
const CompanyProfile = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Profile</h2>
        <p className="text-gray-600">Manage your company information</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={companyData.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={companyData.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Job Management Page
const JobManagementApp = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Management</h2>
        <p className="text-gray-600">Manage your job postings and applications</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-12">
          <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Job Management</h3>
          <p className="text-gray-600">Your job management features will be implemented here</p>
        </div>
      </div>
    </div>
  );
};

// Layout Component
const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/company_dashboard" replace />} />
        <Route path="/company_dashboard/*" element={
          <DashboardLayout>
            <Routes>
              <Route index element={<CompanyDashboard />} />
              <Route path="company-profile" element={<CompanyProfile />} />
              <Route path="job-management" element={<JobManagementApp />} />
            </Routes>
          </DashboardLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;