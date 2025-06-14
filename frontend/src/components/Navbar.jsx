import React, { useState } from 'react';
import { Menu, X, Briefcase } from 'lucide-react';

const Navbar = ({ currentPath, setCurrentPath }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  window.setCurrentPath = setCurrentPath;

  const Link = ({ to, children, className = "" }) => {
    return (
      <button 
        className={className}
        onClick={() => setCurrentPath(to)}
      >
        {children}
      </button>
    );
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HireGenix
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors">Find Jobs</Link>
            <Link to="/companies" className="text-gray-700 hover:text-blue-600 transition-colors">Companies</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Home</Link>
              <Link to="/jobs" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Find Jobs</Link>
              <Link to="/companies" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Companies</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">About</Link>
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link to="/login" className="text-center py-2 text-gray-700 border rounded-lg">
                  Login
                </Link>
                <Link to="/signup" className="text-center py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;