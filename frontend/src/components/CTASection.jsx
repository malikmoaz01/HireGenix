import React from 'react';
import { User, Building2 } from 'lucide-react';

const CTASection = ({ setCurrentPath }) => {
  const Link = ({ to, children, className = "" }) => {
    return (
      <button 
        className={className}
        onClick={() => setCurrentPath && setCurrentPath(to)}
      >
        {children}
      </button>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Find Your Next Opportunity?
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
          Join HireGenix today and take the next step in your career journey. 
          Thousands of exciting opportunities are waiting for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
            <User className="h-5 w-5" />
            <span>Join as Job Seeker</span>
          </Link>
          <Link to="/signup" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>Join as Employer</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;