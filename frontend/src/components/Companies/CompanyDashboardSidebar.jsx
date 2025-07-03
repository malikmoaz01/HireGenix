import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  User, 
  Briefcase, 
  Users, 
  BarChart3, 
  Settings, 
  Menu,
  X,
  ChevronRight,
  LogOut
} from 'lucide-react';

const CompanyDashboardSidebar = ({ activeRoute, onRouteChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Get user info from memory/state instead of localStorage
  useEffect(() => {
    // Try to get user from localStorage first
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } else {
        // Fallback to default user if localStorage is empty
        const defaultUser = {
          name: 'Tech Corp',
          email: 'admin@techcorp.com',
          role: 'company',
          companyName: 'Tech Corp Solutions'
        };
        setUser(defaultUser);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      // Fallback to default user
      const defaultUser = {
        name: 'Tech Corp',
        email: 'admin@techcorp.com',
        role: 'company',
        companyName: 'Tech Corp Solutions'
      };
      setUser(defaultUser);
    }
  }, []);

  const menuItems = [
    {
      path: '/company_dashboard',
      icon: Building2,
      label: 'Dashboard',
      color: 'from-blue-500 to-blue-600'
    },
    {
      path: '/company_dashboard/company-profile',
      icon: User,
      label: 'Company Profile',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      path: '/company_dashboard/job-management',
      icon: Briefcase,
      label: 'Job Management',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      path: '/company_dashboard/candidates',
      icon: Users,
      label: 'Candidates',
      color: 'from-purple-500 to-purple-600'
    },
    {
      path: '/company_dashboard/analytics',
      icon: BarChart3,
      label: 'Analytics',
      color: 'from-pink-500 to-pink-600'
    },
    {
      path: '/company_dashboard/setting',
      icon: Settings,
      label: 'Settings',
      color: 'from-slate-500 to-slate-600'
    }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (path) => {
    console.log('Clicking on path:', path);
    if (onRouteChange) {
      onRouteChange(path);
    }
    setIsOpen(false); // Close mobile menu after selection
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
      // Fallback - just redirect
      window.location.href = '/login';
    }
  };

  // Get user initials for avatar
  const getUserInitials = (user) => {
    if (!user) return 'U';
    
    if (user.name) {
      return user.name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    } else if (user.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  // Get display name
  const getDisplayName = (user) => {
    if (!user) return 'User';
    return user.name || user.email?.split('@')[0] || 'User';
  };

  // Get company name from user data
  const getCompanyName = (user) => {
    if (!user) return 'Company';
    
    // Check if user has company name field
    if (user.companyName) return user.companyName;
    if (user.company_name) return user.company_name;
    if (user.company) return user.company;
    
    // Fallback to name if it's a company account
    if (user.name && user.role === 'company') return user.name;
    
    return 'Company';
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
      >
        {isOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col h-full
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                HireGenix
              </h1>
              <p className="text-xs text-gray-500">Company Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeRoute === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleItemClick(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm' 
                      : 'hover:bg-gray-50 hover:shadow-sm'
                    }
                  `}
                >
                  <div className={`
                    p-2 rounded-lg bg-gradient-to-r ${item.color} 
                    ${isActive ? 'shadow-md' : 'shadow-sm group-hover:shadow-md'}
                    transition-all duration-200
                  `}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className={`
                    font-medium transition-colors duration-200 text-sm flex-1 text-left
                    ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}
                  `}>
                    {item.label}
                  </span>
                  {isActive && (
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">
                  {getUserInitials(user)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {getDisplayName(user)}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {getCompanyName(user)}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm group"
            >
              <LogOut className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDashboardSidebar;