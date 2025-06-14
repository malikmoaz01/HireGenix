import React from 'react';
import { Briefcase, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">HireGenix</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Connecting talented professionals with amazing opportunities. 
              Your next career move starts here.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Heart className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">For Job Seekers</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career Advice</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Salary Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">For Employers</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Post Jobs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Find Candidates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Employer Branding</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-12 text-center text-gray-400">
          <p>&copy; 2025 HireGenix. All rights reserved. Built with ❤️ for connecting talent with opportunity.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;